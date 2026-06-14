# AI Gateway — deploy to FastComet from Mac
#
# Setup (once):
#   cp .env.deploy.example .env.deploy
#   make check-ssh    # expect: SSH OK — s11748.sgp1.stableserver.net
#
# Full deploy:
#   make deploy MSG="Describe your change"
#
# Deploy without git (tar only, code already pushed):
#   make deploy-fast
#
# See DEPLOY-FASTCOMET.md for SSH troubleshooting and FastComet account details.

# Defaults (overridden by .env.deploy when present)
SSH_USER      ?= oxydatam
SSH_HOST      ?= s11748.sgp1.stableserver.net
SSH_PORT      ?= 22

-include .env.deploy

ifndef SSH_TARGET
SSH_TARGET    := $(SSH_USER)@$(SSH_HOST)
endif
SSH_OPTS      := -p $(SSH_PORT) -o ConnectTimeout=15
SCP_OPTS      := -P $(SSH_PORT) -o ConnectTimeout=15
REMOTE_APP    ?= /home/oxydatam/aigateway
REMOTE_TAR    ?= /home/oxydatam/aigateway-build.tar.gz
TAR_FILE      ?= aigateway-build.tar.gz
GIT_BRANCH    ?= main

.PHONY: help build-tar git-push upload remote-deploy deploy deploy-fast check-ssh ping-sitemap

help:
	@echo "AI Gateway — FastComet deploy"
	@echo ""
	@echo "Setup:"
	@echo "  cp .env.deploy.example .env.deploy"
	@echo "  make check-ssh          # port 22 on account oxydatam"
	@echo ""
	@echo "Targets:"
	@echo "  make deploy MSG=\"...\"   Git commit+push, build tar, upload, extract on server"
	@echo "  make deploy-fast        Build tar, upload, extract (skip git)"
	@echo "  make build-tar          Production build + $(TAR_FILE)"
	@echo "  make git-push MSG=\"...\" Commit and push to GitHub"
	@echo "  make upload             Build + SCP $(TAR_FILE) to FastComet"
	@echo "  make remote-deploy      Git reset + extract .next on server (tar must exist)"
	@echo "  make ping-sitemap       Ping Google/Bing after sitemap is live"
	@echo ""
	@echo "After deploy: cPanel → Node.js App → RESTART → https://aigateway.my"

check-ssh:
	@echo "Testing SSH to $(SSH_TARGET) (port $(SSH_PORT))..."
	ssh $(SSH_OPTS) $(SSH_TARGET) 'echo "SSH OK — $$(hostname)"'

ping-sitemap:
	@./scripts/ping-sitemap.sh

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
	scp $(SCP_OPTS) $(TAR_FILE) $(SSH_TARGET):$(REMOTE_TAR)

remote-deploy:
	@echo "Deploying on $(SSH_TARGET)..."
	ssh $(SSH_OPTS) $(SSH_TARGET) 'bash -s' < scripts/deploy-remote.sh

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
	@echo " Then open: https://aigateway.my"
	@echo "=========================================="
