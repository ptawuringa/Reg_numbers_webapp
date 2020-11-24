const assert = require('assert');
const registration_number = require('../registration_number');
const pg = require("pg");
const Pool = pg.Pool;




const connectionString = process.env.DATABASE_URL || 'postgresql://patience:codex123@localhost:5432/reg_numbers';

const pool = new Pool({
    connectionString
})


describe('The basic database web app', function () {

    beforeEach(async function () {
        await pool.query("delete from greet;");

    });

    describe('addPlate', function () {
        it('should add unique reg numbers', async function () {
            const registrationInstance = registration_number(pool)
    
            await registrationInstance.addPlate('capetown');
            let reg = await registrationInstance.getPlate();
    
            assert.deepStrictEqual([{ 'reg': 'CA 123 456' }], reg);
        });

        it('should filter for a town', async function () {
            const registrationInstance = registration_number(pool)
    
            await registrationInstance.getTownId('CA');
            let code = await registrationInstance.getName();
    
            assert.deepStrictEqual([{ 'code': 'CA' }], code);
        });
    })

    

    it('should give error message for an invalid regNumbers ', async function () {

        const registrationInstance = registration_number(pool)

        await registrationInstance.selectAndUpdate('CA 123')
        await registrationInstance.selectAndUpdate('CA 123 452')
        await registrationInstance.selectAndUpdate('CY 123')
        await registrationInstance.selectAndUpdate('CJ 123 125')


        assert.equal(3, await registrationInstance.all('CA 123'));
    });

    it('should able to count how many name are being entered', async function () {

        const greetInstance = greet(pool)

        await greetInstance.selectAndUpdate('Makho')
        await greetInstance.selectAndUpdate('Salizwa')
        await greetInstance.selectAndUpdate('Themba')


        assert.equal(3, await greetInstance.nameCount());
    });

    it('should able to get username', async function () {

        const greetInstance = greet(pool)

        await greetInstance.selectAndUpdate("Tinashe")
        await greetInstance.selectAndUpdate("Patience")
        await greetInstance.selectAndUpdate("Makho")


        assert.deepStrictEqual([
            {
                name: 'Tinashe'
            },
            {
                name: 'Patience'
            },
            {
                name: 'Makho'
            }
        ]
            , await greetInstance.getName());
    });




    it('should able to delete a name', async function () {

        // const greetInstance = greet(pool)

        // await greetInstance.selectAndUpdate('Makho')
        // await greetInstance.selectAndUpdate('Patience')
        // await greetInstance.selectAndUpdate('Makho')
        // await greetInstance.deleteOne()

        // assert.deepStrictEqual([], await greetInstance.getName());

    });

    after(function () {
        pool.end();
    })
});




