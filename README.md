## Inizializzazione del Progetto

https://jestjs.io/docs/getting-started#using-typescript

`npm init`
`npm init jest@latest`
`npm install --save-dev @babel/preset-typescript`
`npm install typescript`
`npm install jest`

Creare file 'babel.config.json` e incollare

```
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```

## Inizializzazione del Progetto (git)

Una volta scaricato questo progetto, lanciare:
`npm install`
`npm link typescript`

Questi comandi installano i pacchetti necessari, e linkano typescript. 

## Configurazione
There are some caveats to using TypeScript with Babel. Because TypeScript support in Babel is purely transpilation, Jest will not type-check your tests as they are run. If you want that, you can use ts-jest instead, or just run the TypeScript compiler tsc separately (or as part of your build process).

Configurare preprocessor typescript
`npm install --save-dev ts-jest`
`npm install --save-dev @jest/globals`

### Linkare Typescript
In caso di errori su 'typescript' non trovato, linkare il pacchetto globale typescript
`npm link typescript`

### Pre testare
Lanciare da console il comando `npm run test`

### Per testare in Debug
Installare eventualmente il plugin `jest` di Facebook per VsCode che facilita i test

Aggiungere in package.json `jest -runInBand` (sezione scripts)

```
"scripts": {
    "test": "jest",
    "test:debug": "jest -runInBand"
  }
```

Questo permetterà di debuggare i test lanciando il comando `npm run test:debug`

### Escludere file da coverage

Modificare la proprietà file `jest.config.ts`:
```
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/Utils/utils.ts' //Esclude il file utils.ts da coverage
  ],
```
Questo, ad esempio esclude il file utils.ts dalla coverage (notare il !)


