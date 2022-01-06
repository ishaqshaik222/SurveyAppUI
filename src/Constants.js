const prod = {
    url: {
        API_URL: 'http://3.109.197.149/projects/survey_app/api'
    }
};
const dev = {
    url: {
        API_URL: 'http://localhost/folkslogic/survey_app/api'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;