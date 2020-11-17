module.exports = function regNumbers(pool){

   async function addPlate(reg){
    var num = reg.substring(0.2);
    let motor = await pool.query('SELECT id FROM registration_numbers WHERE reg_number = $1',[reg]);
    console.log(motor)

   }

    
         


      return {
            addPlate,
          

       }


  

  }