## Seasonless Payment

### Project setup Instruction

##### git clone the repo

##### `https://github.com/anyatibrian/seasonless.git`

##### `cd seasonless`

##### run `yarn add all`

##### run `yarn start` to run the project

##### the project will be loaded at `http://localhost:3000`

##### to load the repayment details load `http://localhost:3000/payments`

### Uploading customers repayments

##### load `http://localhost:3000/payments` with `post` method on `postman`

```
{   "seasonId":"",
    "customerId":1,
    "amount":30
}
```
