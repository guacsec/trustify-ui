## Static report

Static Report is a user interface for the Scan SBOM. As the name suggests, it's completely static in nature, and does not talk to any external APIs.

## Developing / Contributing

### How it works?

As stated in the introduction, the interface is completely static in nature. All of the data displayed in the UI resides in `client/src/static-report/data.js` file. It is empty by default when you build the project. In order to display actual output of an analysis, `data.js` must contain data generated from an analysis. 

The `data.js` should be populated by the output of `POST /api/v2/vulnerability/analyze`

### Running in developtment mode

At the **root** of the entire project.

- Install dependencies:

```shell
npm ci
```

- Run the project:

```shell
npm run start:dev:static-report
```

This will serve the report at http://localhost:3000 and will render the data that lives in `client/src/static-report/data.js`

### Running in production mode

- Build the project:

```shell
npm run build
```

This will generate a `client/dist/static-report` directory. It serves as a template; therefore, It doesn't contain the `data.js` file as it must be generated manually or by other tool like the backend.
