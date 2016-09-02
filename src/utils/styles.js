export function mergeClassNames(classNames, className) {
    return classNames.split(' ').concat([className]).join(' ')
}