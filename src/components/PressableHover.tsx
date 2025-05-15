import { Pressable, PressableProps } from "react-native";

export const PressableHover = (props: PressableProps) => {
    const { children } = props;
    
    return (
    <Pressable {...props} style={({ hovered }) => ({
        opacity: hovered ? 0.8 : 1
    })}>
        {children}
    </Pressable>
    )
}