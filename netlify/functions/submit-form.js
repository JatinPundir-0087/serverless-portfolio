const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  try {
    const { name, email, message } = JSON.parse(event.body);

    const { data, error } = await supabase
      .from('messages') 
      .insert([{ name, email, message }]);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success! Message sent." }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};