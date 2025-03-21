import { test, expect } from '@playwright/test';
import { create } from 'domain';
import { ApiHelper } from './helper';

const bearToken = require('../../src/utils/token.json');
const user = require('../../src/utils/user.json');
const url = require('../../src/utils/url.json');




test.describe('This is the place for API testing',async()=>{
    //NO.1：Positive test case
    test('NO.1 Validate POST method to create user works',async({request})=>{
        //Call the POST method and vaidate its response
        const createdUserId= await ApiHelper.createUser(request, url.baseUrl, user, bearToken.token);
        // console.log("The created user ID is: "+createdUserId);

        //Call the GET method to validate the user is created 
        await ApiHelper.getSpecificUser(request, url.baseUrl, createdUserId, user, bearToken.token);

        //Call the DELETE method to delete the created user
        await ApiHelper.deleteSpecificUser(request, url.baseUrl, createdUserId, bearToken.token);
    })

    //NO.2: Negative test case: unauthorized user
    test('NO.2 Validate the 401 error when there is missing or invalid token',async({request})=>{
        //Call the POST method with missing token
        await ApiHelper.createUserWithInvalidOrMissingToken(request, url.baseUrl, user, "");

        //Call the POST metjod with invalid token
        await ApiHelper.createUserWithInvalidOrMissingToken(request, url.baseUrl, user, "wrong");
    })

    //NO.3: Negative test case: create existed user
    test('NO.3 Validate the 422 error when create existed user',async({request})=>{
        //Call the POST method with missing token
        const createdUserId = await ApiHelper.createDuplicateUser(request, url.baseUrl, user, bearToken.token);

        //Call the DELETE method to delete the created user
        await ApiHelper.deleteSpecificUser(request, url.baseUrl, createdUserId, bearToken.token);
    })
})

