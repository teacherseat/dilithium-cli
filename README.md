# dilithium-cli

## Usage

```
computer being program <name-of-app>
```

## Globally Install For Developmenet

For developement we'll want to be able to globall install this package
so we need to do a link:

```
cd dilithium-cli
npm link
```

Now you should be able to use the `computer` command.

## Using local Dilithium

If you need to work with your local package of dilithium you can install
it temporarly in the package.json. Just remember to undo these changes
to our package.json and package-lock.json before committing.

```
npm i --save /path/to/dilithium.js
```

