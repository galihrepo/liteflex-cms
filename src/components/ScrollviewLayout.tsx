import React, { ReactNode } from "react";
import { ScrollView } from "react-native";

type ScrollViewLayoutProps = {
    children?: ReactNode;
}

export const ScrollViewLayout = (props: ScrollViewLayoutProps) => {
    const {children} = props;
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
            {children}
        </ScrollView>
    );
}