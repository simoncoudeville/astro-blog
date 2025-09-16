export const SITE_ATHOUR = 'Simon Coudeville';
// export const SITE_DESCRIPTION = 'Designer, coder and teacher';
// export const SITE_DESCRIPTION = 'Designer who likes to code';
// export const SITE_DESCRIPTION = 'Designer & teacher who likes to code';
// export const SITE_DESCRIPTION = 'Design & code';
// export const SITE_DESCRIPTION = 'Designer and code enthousiast';
// export const SITE_DESCRIPTION = 'Designing and building interfaces';
// export const SITE_DESCRIPTION = 'Interactive design and code';
export const SITE_DESCRIPTION = 'Designer, developer &amp; teacher';
// export const SITE_DESCRIPTION = 'Interaction designer';
// export const SITE_DESCRIPTION = 'Interaction designer';
// export const SITE_DESCRIPTION = 'Design engineer and teacher';
// export const SITE_DESCRIPTION = 'Designer and builder of interfaces';
// export const SITE_DESCRIPTION = 'Crafting interfaces';

// a function to set the dates to .toLocaleTimeString("en-gb") with options
export const formatDate = (date: string | number | Date) => {
    return new Date(date).toLocaleDateString("en-gb", {
        year: "numeric",
        day: "numeric",
        month: "short"
    });
};

export default formatDate;