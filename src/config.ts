export const SITE_ATHOUR = 'Simon Coudeville';
// export const SITE_ATHOUR = 'Astro blog';

// a function tho set the dates to .toLocaleDateString("en-gb").replace(/\//g, "-")
// export const formatDate = (date: string | number | Date) => {
//     return new Date(date).toLocaleDateString("en-gb").replace(/\//g, " - ");
// };

// a function to set the dates to .toLocaleTimeString("en-gb") with options
export const formatDate = (date: string | number | Date) => {
    return new Date(date).toLocaleDateString("en-gb", {
        year: "numeric",
        day: "numeric",
        month: "short"
    });
};

export default formatDate;