export default {
    required: (t) => t("error.required"),
    string: (t) => {
        return {
            value: /^ *\w+(\s+\w+)* *$/,
            message: t("error.string")
        }
    },
    number: (t) => {
        return {
            value: /^-?\d+(?:,\d+)?(?:[Ee][-+]?\d+)?$/i,
            message: t("error.numeric")
        }
    },
    min: (t, v) => {
        return {
            value: v,
            message: t("error.min", {
                value: v
            })
        }
    },
    maxStrLength: (t, v = 100) => {
        return {
            value: v,
            message: t("error.maxStr", {
                value: v
            })
        }
    },
};