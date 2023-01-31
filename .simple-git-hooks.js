
module.exports = {
	"pre-commit": "pnpm typecheck && pnpm lint-staged",
	"commit-msg": "pnpm soy git-commit-verify",
	// "pre-push": "cd ../../ && npm run format",
};
