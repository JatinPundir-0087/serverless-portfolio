const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.handler = async (event) => {
    if (event.httpMethod !== 'DELETE') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { id } = JSON.parse(event.body);

    try {
        const { error } = await supabase
            .from('messages')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message deleted successfully' }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};