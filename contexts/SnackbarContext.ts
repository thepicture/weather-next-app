import React from "react";

export interface SnackbarContextProps {
    showSnackbar: (message: string) => void;
}

export const SnackbarContext = React.createContext<SnackbarContextProps>({ showSnackbar: () => { } });