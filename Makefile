install: 
	npm install
publish:
	npm publish --dry-run
lint:
	npx eslint .
test: 
<<<<<<< HEAD
	npx jest
=======
	npm test
>>>>>>> branch2
test-coverage:
	npm test -- --coverage
