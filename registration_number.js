module.exports = function regNumbers(pool) {

   async function addPlate(reg) {
      var num = reg.substring(0.2);
      let motor = await pool.query('SELECT id FROM registration_numbers WHERE reg_number = $1', [reg]);
      console.log(motor)

   }


   async function getTownId(code) {
      var result = await pool.query("select id from towns where code=$1", [code]);
      return result.rows[0]["id"]

   }

   async function insertData(insertReg) {
      console.log(insertReg);
      let input = insertReg.split(" ");
      let code = await getTownId(input[0])    
      await pool.query('insert into registration_numbers (reg_number, town_id) values ($1,$2)',[insertReg,code]);
      return true;
   }

   async function getData(){
      var get = await pool.query('SELECT reg_number FROM registration_numbers' );
      return get.rows;
   }



   async function selectAndUpdate(code) {
      var code = names.toUpperCase().charAt(0) + names.slice(1).toLowerCase()

      let results = await pool.query('SELECT reg_number FROM registration_numbers WHERE id = $1', [code]);
      if (results.rows.length > 0) {
          await update(code)
      }
      else {
          await setReg(code)
      }
  }



   return {
      addPlate,
      getTownId,
      selectAndUpdate,
      insertData,
      getData


   }




}