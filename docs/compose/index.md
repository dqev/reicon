# Using Reicon with Jetpack Compose

The official Jetpack Compose package for Reicon. Import beautifully crafted icons as native `ImageVector`s with full IDE autocompletion. All icons are tree-shakeable, ensuring only the icons you actually use end up in your APK.

## What you can accomplish
- Import icons as individual `ImageVector` objects
- Customize size, color, and weight via parameters
- Tree-shake unused icons to keep APK sizes minimal
- Full IDE autocompletion for all 2676+ icons
- Use icons with Material2, Material3, or plain Canvas
- Apply `Modifier` and tint directly, no SVG renderer needed

---

## Installation
```kotlin
// settings.gradle.kts
maven { url = uri("https://jitpack.io") }

// app/build.gradle.kts
implementation("dev.reicon:reicon-compose:1.0.0")
```

---

## Basic Usage
Import icons by their PascalCase name from `dev.reicon`. Each icon is an object exposing an `ImageVector` per weight.
```kotlin
import dev.reicon.Bell
import dev.reicon.Home
import dev.reicon.ReiconIcon
import dev.reicon.ShieldCheck

@Composable
fun App() {
    Column {
        ReiconIcon(Home.Outline, contentDescription = "Home")
        ReiconIcon(ShieldCheck.Outline, contentDescription = "Verified", size = 24.dp, tint = Color(0xFF9B8AFB))
        ReiconIcon(Bell.Filled, contentDescription = "Notifications")
    }
}
```

---

## Customizing Icons
Every icon is rendered with `ReiconIcon()` or Material `Icon()`, which accept the following parameters to customize appearance.
```kotlin
// Size
ReiconIcon(Home.Outline, contentDescription = null, size = 16.dp)
ReiconIcon(Home.Outline, contentDescription = null, size = 24.dp)
ReiconIcon(Home.Outline, contentDescription = null, size = 32.dp)

// Color
ReiconIcon(Heart.Outline, contentDescription = null, tint = Color(0xFFEF4444))
ReiconIcon(Heart.Outline, contentDescription = null, tint = Color(0xFF6366F1))

// Weight
ReiconIcon(Star.Outline, contentDescription = null)   // Outline
ReiconIcon(Star.Filled, contentDescription = null)    // Filled

// Modifier
ReiconIcon(Home.Outline, contentDescription = null, modifier = Modifier.padding(4.dp))
```

---

## Direct Import for Smaller Bundles
For the absolute smallest APK size, each icon lives in its own file, so R8 removes every icon you don't reference. No extra configuration needed — just don't import what you don't use.

> **Tip:** Per-icon files are recommended for production apps where APK size matters. Each icon is its own object, so the compiler can't accidentally pull in other icons.

---

## Using with Material3
Reicon works seamlessly with Material3. Use the `tint` parameter or inherit the content color — icons default to `LocalContentColor.current`, so `contentColor` from buttons, list items, and app bars applies out of the box.
```kotlin
IconButton(onClick = { /* ... */ }) {
    ReiconIcon(Bell.Outline, contentDescription = "Notifications")
}

Button(onClick = { /* ... */ }) {
    ReiconIcon(ShieldCheck.Outline, contentDescription = null, tint = Color(0xFF22C55E))
    Text("Verified")
}
```

---

## Full Component Example
Here's a complete example of a top app bar using multiple Reicon icons with different configurations.
```kotlin
import dev.reicon.Bell
import dev.reicon.Home
import dev.reicon.ShieldCheck
import dev.reicon.Star
import dev.reicon.User

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Navbar() {
    TopAppBar(
        title = { Text("Reicon") },
        navigationIcon = {
            IconButton(onClick = { /* ... */ }) {
                ReiconIcon(Home.Outline, contentDescription = "Home")
            }
        },
        actions = {
            IconButton(onClick = { /* ... */ }) {
                ReiconIcon(Bell.Outline, contentDescription = "Notifications")
            }
            IconButton(onClick = { /* ... */ }) {
                ReiconIcon(User.Outline, contentDescription = "Profile")
            }
            ReiconIcon(Star.Filled, contentDescription = "Favorite", tint = Color(0xFFF59E0B))
            ReiconIcon(ShieldCheck.Outline, contentDescription = "Verified", tint = Color(0xFF9B8AFB))
        }
    )
}
```

> **Note:** All icons are plain `ImageVector`s and work with any Compose renderer — Material2, Material3, Canvas `drawVector`, and Wear Compose — out of the box.
