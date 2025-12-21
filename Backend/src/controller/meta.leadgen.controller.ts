import axios from "axios";

export async function fetchMetaLead(leadgenId: string) {
    const res = await axios.get(
        `https://graph.facebook.com/v24.0/${leadgenId}`,
        {
            params: {
                access_token: process.env.META_VERIFY_TOKEN!,
                fields: "created_time,field_data,ad_id,form_id"
            }
        }
    );
    return res.data;
}
