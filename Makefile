# AI Gateway — deploy to FastComet from Mac
#
# Setup (once):
#   cp .env.deploy.example .env.deploy
#   Edit SSH_TARGET in .env.deploy (your FastComet SSH login)
#
# Full deploy:
#   make deploy MSG="Describe your change"
#
# Deploy without git (tar only, code already pushed):
#   make deploy-fast

-include .env.deploy

SSH_TARGET    ?= oxydatam@s11748
REMOTE_APP    ?= /home/oxydatam/aigateway
REMOTE_TAR    ?= /home/oxydatam/aigateway-build.tar.gz
TAR_FILE      ?= aigateway-build.tar.gz
GIT_BRANCH    ?= main
NODE_VENV     ?= /home/oxydatam/nodevenv/aigateway/22/bin/activate

.PHONY: help build-tar git-push upload remote-deploy deploy deploy-fast check-ssh

help:
	@echo "AI Gateway — FastComet deploy"
	@echo ""
	@echo "Setup:"
	@echo "  cp .env.deploy.example .env.deploy   # set SSH_TARGET"
	@echo ""
	@echo "Targets:"
	@echo "  make deploy MSG=\"...\"   Git commit+push, build tar, upload, extract on server"
	@echo "  make deploy-fast        Build tar, upload, extract (skip git)"
	@echo "  make build-tar          Production build + $(TAR_FILE)"
	@echo "  make git-push MSG=\"...\" Commit and push to GitHub"
	@echo "  make upload             SCP $(TAR_FILE) to FastComet"
	@echo "  make remote-deploy      git pull + extract .next on server"
	@echo "  make check-ssh          Test SSH connection"
	@echo ""
	@echo "After deploy: cPanel → Node.js App → RESTART"

check-ssh:
	@echo "Testing SSH to $(SSH_TARGET)..."
	ssh -o ConnectTimeout=10 $(SSH_TARGET) 'echo "SSH OK — $$(hostname)"'

build-tar:
	@echo "Stopping dev server..."
	@pkill -f "next dev" 2>/dev/null || true
	@sleep 1
	@echo "Building production bundle..."
	@rm -rf .next
	@NODE_ENV=production npm run build:local
	@echo "Packaging $(TAR_FILE)..."
	@COPYFILE_DISABLE=1 tar --no-xattrs -czf $(TAR_FILE) .next
	@test -d .next/server && test -d .next/static
	@ls -lh $(TAR_FILE)
	@echo "Build OK: server + static included"

git-push:
ifndef MSG
	$(error MSG is required. Example: make deploy MSG="Remove header Contact Us button")
endif
	@echo "Committing and pushing to origin/$(GIT_BRANCH)..."
	@git add -A
	@git diff --cached --quiet || git commit -m "$(MSG)"
	@git push origin $(GIT_BRANCH)
	@git log -1 --oneline

upload: build-tar
	@echo "Uploading $(TAR_FILE) → $(SSH_TARGET):$(REMOTE_TAR)"
	scp $(TAR_FILE) $(SSH_TARGET):$(REMOTE_TAR)

remote-deploy:
	@echo "Deploying on $(SSH_TARGET)..."
	ssh $(SSH_TARGET) 'bash -s' < scripts/deploy-remote.sh

deploy: git-push upload remote-deploy
	@echo ""
	@echo "=========================================="
	@echo " Deploy complete."
	@echo " Last step: cPanel → Node.js App → RESTART"
	@echo " Then open: https://aigateway.my"
	@echo "=========================================="

deploy-fast: upload remote-deploy
	@echo ""
	@echo "=========================================="
	@echo " Deploy complete (no git push)."
	@echo " Last step: cPanel → Node.js App → RESTART"
	@echo "=========================================="
