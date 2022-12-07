export const SITE_ATHOUR = 'Simon Coudeville';

// a function tho set the dates to .toLocaleDateString("en-gb").replace(/\//g, "-")
export const formatDate = (date: string | number | Date) => {
    return new Date(date).toLocaleDateString("en-gb").replace(/\//g, " - ");
};

export default formatDate;