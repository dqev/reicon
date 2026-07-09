# React Native Usage Guide

Complete guide for using Reicon icons in React Native applications.

## Installation

Install both `reicon-react-native` and `react-native-svg`:

```bash
npm install reicon-react-native react-native-svg
# or
yarn add reicon-react-native react-native-svg
# or
bun add reicon-react-native react-native-svg
```

### Additional Setup

`react-native-svg` requires additional setup:

**For iOS:**
```bash
cd ios && pod install
```

**For Expo:**
```bash
npx expo install react-native-svg
```

See [react-native-svg documentation](https://github.com/software-mansion/react-native-svg#installation) for more details.

---

## Basic Usage

Import icons directly from the package:

```tsx
import { Home, Settings, User } from 'reicon-react-native';

function MyComponent() {
  return (
    <View>
      <Home />
      <Settings size={32} />
      <User color="#6366F1" />
    </View>
  );
}
```

---

## Props

All icons accept these props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Icon size in pixels |
| `color` | `string` | `#000000` | Primary icon color (hex, rgb, or named) |
| `secondaryColor` | `string` | same as color | Secondary color for dual-tone icons |
| `weight` | `'Outline' \| 'Filled'` | `'Outline'` | Icon weight/style |
| `strokeWidth` | `number \| string` | — | Override default stroke width |
| `style` | `ViewStyle` | — | React Native style object |

Plus all standard `react-native-svg` props like `onPress`, `testID`, etc.

---

## Examples

### Basic Icon

```tsx
import { Home } from 'reicon-react-native';

<Home />
```

### Custom Size and Color

```tsx
import { ShieldCheck } from 'reicon-react-native';

<ShieldCheck 
  size={48} 
  color="#10b981"
/>
```

### Filled Weight

```tsx
import { Heart } from 'reicon-react-native';

<Heart 
  weight="Filled"
  color="red"
/>
```

### With Touch Handler

```tsx
import { Settings } from 'reicon-react-native';

<TouchableOpacity onPress={() => console.log('Settings pressed')}>
  <Settings size={28} color="#6366F1" />
</TouchableOpacity>
```

### With Custom Stroke Width

```tsx
import { Menu } from 'reicon-react-native';

<Menu 
  strokeWidth={1.5}
  size={32}
/>
```

### Dual-Tone Icons

Some icons support secondary colors:

```tsx
import { UserCircle } from 'reicon-react-native';

<UserCircle 
  color="#3b82f6"
  secondaryColor="#93c5fd"
/>
```

---

## Direct Import (Tree-Shaking)

Import specific icons for optimal bundle size:

```tsx
import Home from 'reicon-react-native/icons/Home';
import Settings from 'reicon-react-native/icons/Settings';

function App() {
  return (
    <View>
      <Home />
      <Settings />
    </View>
  );
}
```

Metro bundler automatically tree-shakes unused icons, so both approaches work well.

---

## TypeScript

Full TypeScript support with type definitions:

```tsx
import { Home, IconProps, IconWeight } from 'reicon-react-native';

// Type-safe props
const iconProps: IconProps = {
  size: 32,
  color: '#6366F1',
  weight: 'Filled'
};

// Type-safe weight
const weight: IconWeight = 'Outline';

function MyComponent() {
  return <Home {...iconProps} />;
}
```

---

## Icon Names

Icons use PascalCase naming derived from their kebab-case names:

| Original | Import Name |
|----------|-------------|
| `home` | `Home` |
| `shield-check` | `ShieldCheck` |
| `alt-arrow-down` | `AltArrowDown` |
| `shopping-cart` | `ShoppingCart` |
| `user-circle` | `UserCircle` |

Browse all icons at [reicon.dev](https://reicon.dev).

---

## Styling

### Using Style Prop

```tsx
import { Home } from 'reicon-react-native';

<Home 
  style={{
    marginRight: 8,
    opacity: 0.8
  }}
/>
```

### Wrapping in Touchable

```tsx
import { Pressable } from 'react-native';
import { Heart } from 'reicon-react-native';

function LikeButton() {
  const [liked, setLiked] = useState(false);
  
  return (
    <Pressable onPress={() => setLiked(!liked)}>
      <Heart
        weight={liked ? 'Filled' : 'Outline'}
        color={liked ? '#ef4444' : '#6b7280'}
        size={28}
      />
    </Pressable>
  );
}
```

---

## Performance

### Tree-Shaking

Every icon is a separate module, ensuring only imported icons are bundled:

```tsx
// ✅ Good - only Home is bundled
import { Home } from 'reicon-react-native';

// ✅ Also good - explicit path
import Home from 'reicon-react-native/icons/Home';
```

### Memoization

For icons in lists or frequently re-rendered components:

```tsx
import { memo } from 'react';
import { Star } from 'reicon-react-native';

const StarIcon = memo(({ filled }: { filled: boolean }) => (
  <Star 
    weight={filled ? 'Filled' : 'Outline'}
    color="#fbbf24"
  />
));
```

---

## Common Patterns

### Icon Button Component

```tsx
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { IconComponent } from 'reicon-react-native';

interface IconButtonProps extends TouchableOpacityProps {
  icon: IconComponent;
  size?: number;
  color?: string;
}

function IconButton({ 
  icon: Icon, 
  size = 24, 
  color = '#000',
  ...props 
}: IconButtonProps) {
  return (
    <TouchableOpacity {...props}>
      <Icon size={size} color={color} />
    </TouchableOpacity>
  );
}

// Usage
import { Settings } from 'reicon-react-native';

<IconButton 
  icon={Settings}
  onPress={() => console.log('Settings')}
/>
```

### Navigation Tab Icons

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, User } from 'reicon-react-native';

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let Icon;
          
          if (route.name === 'Home') Icon = Home;
          else if (route.name === 'Search') Icon = Search;
          else if (route.name === 'Profile') Icon = User;
          
          return (
            <Icon 
              size={size}
              color={color}
              weight={focused ? 'Filled' : 'Outline'}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

---

## Troubleshooting

### Icons not showing

1. Ensure `react-native-svg` is installed and linked:
```bash
npm install react-native-svg
cd ios && pod install
```

2. Rebuild your app after installing dependencies

### Color not working

The default color is black (`#000000`) instead of `currentColor` in React Native. Always specify a color prop if you want a different color:

```tsx
<Home color="#6366F1" />
```

### TypeScript errors

Make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

---

## Resources

- 🌐 [Browse all icons](https://reicon.dev)
- 📖 [Full documentation](https://reicon.dev/usage)
- 📦 [npm package](https://npmjs.com/package/reicon-react-native)
- 🐙 [GitHub repository](https://github.com/dqev/reicon)
- 🐛 [Report issues](https://github.com/dqev/reicon/issues)
