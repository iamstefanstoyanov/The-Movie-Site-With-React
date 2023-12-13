export const formatDate = (isoDate) => {
    return new Date(isoDate).toUTCString();
};