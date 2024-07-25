const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const supabaseUrl = 'https://ptdcusrimsowtumozeln.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SBcontroller = {};

// this is test function to check if the data is connected
SBcontroller.get_data_test = async (req, res, next) => {

    try {
        console.log(supabase)

        const { data, error }  = await supabase
            .from('test')
            .select('*')
        
        
  
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Data fetched successfully:', data);
        res.json(data);
      }
    } catch (error) {
      console.error('could not fetch data, not connected:', error);
    }
  
  
  }

  module.exports = SBcontroller;



