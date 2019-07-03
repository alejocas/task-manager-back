export const Task = {
    id: (parent) => parent.id,
    title: (parent) => parent.title,
    description: (parent) => parent.description,
    checked: (parent) => parent.checked
};