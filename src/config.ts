export const SITE_ATHOUR = 'Simon Coudeville';

// a function to set the dates to .toLocaleTimeString("en-gb") with options
export const formatDate = (date: string | number | Date) => {
    return new Date(date).toLocaleDateString("en-gb", {
        year: "numeric",
        day: "numeric",
        month: "short"
    });
};

export default formatDate;