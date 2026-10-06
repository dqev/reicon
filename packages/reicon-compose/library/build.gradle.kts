plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.plugin.compose")
    id("com.diffplug.spotless")
    `maven-publish`
}

group = "dev.reicon"
// JitPack builds a git tag (or main-SNAPSHOT) and exposes it via the VERSION
// env var. The published version MUST match the requested version, otherwise
// JitPack reports the version as missing. Locally VERSION is unset -> 1.0.0.
val libVersion = System.getenv("VERSION") ?: "1.0.0"
version = libVersion

android {
    namespace = "dev.reicon"
    compileSdk = 36

    defaultConfig {
        minSdk = 24
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    publishing {
        singleVariant("release") {
            withSourcesJar()
        }
    }
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile>().configureEach {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
        allWarningsAsErrors.set(true)
        freeCompilerArgs.add("-Xjsr305=strict")
    }
}

dependencies {
    api(platform("androidx.compose:compose-bom:2026.04.01"))
    api("androidx.compose.ui:ui-graphics")
    api("androidx.compose.material3:material3")
}

afterEvaluate {
    publishing {
        publications {
            create<MavenPublication>("release") {
            from(components["release"])
            groupId = "dev.reicon"
            artifactId = "reicon-compose"
            version = libVersion
            pom {
                name = "reicon-compose"
                description = "Jetpack Compose icons for Reicon"
                url = "https://github.com/dqev/reicon"
                licenses {
                    license {
                        name = "MIT License"
                        url = "https://opensource.org/licenses/MIT"
                    }
                }
            }
            }
        }
    }
}

spotless {
    kotlin {
        ktlint()
        trimTrailingWhitespace()
        leadingTabsToSpaces()
        endWithNewline()
    }
}
