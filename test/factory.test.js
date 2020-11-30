const assert = require('assert');
const registration_number = require('../registration_number');
const pg = require("pg");
const Pool = pg.Pool;




const connectionString = process.env.DATABASE_URL || 'postgresql://patience:pg123@localhost:5432/reg_numbers';

const pool = new Pool({
    connectionString
})


describe('The basic database web app', function () {

    beforeEach(async function () {
        await pool.query("delete from registration_numbers;");

    });


    it('should add unique reg numbers', async function () {
        const registrationInstance = registration_number(pool)

        await registrationInstance.addPlate('capetown');
        let reg = await registrationInstance.getData();

        assert.deepStrictEqual([], reg);
    });

    it('should filter for a town', async function () {
        const registrationInstance = registration_number(pool)



        await registrationInstance.getTownId('CA');
        let code = await registrationInstance.getTownId();

        assert.deepStrictEqual([{ 'code': 'CA' }], code);
    });



    it('should give error message for an invalid regNumbers ', async function () {

        const registrationInstance = registration_number(pool)

        await registrationInstance.selectAndUpdate('CA 123')
        await registrationInstance.selectAndUpdate('CA 123 452')
        await registrationInstance.selectAndUpdate('CY 123')
        await registrationInstance.selectAndUpdate('CJ 123 125')


        assert.equal(3, await registrationInstance.all('CA 123'));
    });

    it('should able to count how many registration are being entered', async function () {

        const registrationInstance = registration_number(pool)

        await registrationInstance.selectAndUpdate('CA 123 456')
        await registrationInstance.selectAndUpdate('CY 123')
        await registrationInstance.selectAndUpdate('CJ 123 125')


        assert.equal(3, await registrationInstance.getData());
    });

    it('should able to get registration', async function () {

        const registrationInstance = registration_number(pool)

        await registrationInstance.selectAndUpdate("CA 123 456")
        await registrationInstance.selectAndUpdate("CY 123")
        await registrationInstance.selectAndUpdate("CJ 123 125")


        assert.deepStrictEqual([
            {
                reg: 'CA 123 456'
            },
            {
                name: 'CY 123'
            },
            {
                name: 'CJ 123 125'
            }
        ]
            , await registrationInstance.getTownId());
    });




    it('should able to delete a registration number', async function () {

        const registrationInstance = registration_number(pool)

        await registrationInstance.selectAndUpdate('CA 123 456')
        await registrationInstance.selectAndUpdate('CY 123')
        await registrationInstance.selectAndUpdate('CJ 123 124')
        await registrationInstance.deleteOne()

        assert.deepStrictEqual([], await registrationInstance.getSelectedTown());

    });

    after(function () {
        pool.end();
    })
});




