import React from "react";
import { TouchableOpacity, StyleSheet} from "react-native";
import { Avatar } from "react-native-paper";

// Define a mapping of letters to emojis
const emojiMap = {
  A: "🐯", B: "🏂", C: "🦄", D: "🦚", E: "👻", F: "😎", G: "🤠", H: "😜",
  I: "😇", J: "🍋", K: "🥝", L: "🍋", M: "🥭", N: "👨‍🚀", O: "🦄", P: "🐯",
  Q: "👻", R: "😜", S: "😎", T: "🤠", U: "🦚", V: "🦁", W: "🍍", X: "🥝",
  Y: "👨‍🚀", Z: "😇"
};

type EmojiAvatarProps = {
  firstname: string | null;
  onPress: () => void;
  color?: string;
  backgroundColor?: string;
  size?: number; 
  height?: number;
  width?: number; 
};

type Letter = keyof typeof emojiMap;

const EmojiAvatar: React.FC<EmojiAvatarProps> = ({ firstname, onPress, color = "#8338EC", backgroundColor = "white", size , height, width}) => {
  // Ensure firstname is not null or undefined
  const firstInitial = firstname?.charAt(0)?.toUpperCase() as Letter;

  // Get the emoji based on the first letter of the firstname
  const firstEmoji = emojiMap[firstInitial] || "🙂";
  const initials = `${firstEmoji}`;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <Avatar.Text 
        size={size} 
        label={initials} 
        color={color} 
        style={[styles.avatar, { backgroundColor },{height}, {width}]} 

      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default EmojiAvatar;
