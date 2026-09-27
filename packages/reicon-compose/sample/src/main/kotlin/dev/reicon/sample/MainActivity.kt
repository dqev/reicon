package dev.reicon.sample

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import dev.reicon.Alarm
import dev.reicon.Bell
import dev.reicon.Chat
import dev.reicon.Heart
import dev.reicon.Home
import dev.reicon.Home2
import dev.reicon.Loader
import dev.reicon.Message
import dev.reicon.ReiconIcon
import dev.reicon.Search
import dev.reicon.Send
import dev.reicon.Send2
import dev.reicon.Settings
import dev.reicon.User
import dev.reicon.WindowChartLine

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Catalog()
            }
        }
    }
}

private data class Entry(val name: String, val outline: ImageVector, val filled: ImageVector)

private val entries = listOf(
    Entry("home", Home.Outline, Home.Filled),
    Entry("search", Search.Outline, Search.Filled),
    Entry("heart", Heart.Outline, Heart.Filled),
    Entry("chat", Chat.Outline, Chat.Filled),
    Entry("send2", Send2.Outline, Send2.Filled),
    Entry("bell", Bell.Outline, Bell.Filled),
    Entry("settings", Settings.Outline, Settings.Filled),
    Entry("user", User.Outline, User.Filled),
    Entry("message", Message.Outline, Message.Filled),
    Entry("send", Send.Outline, Send.Filled),
    Entry("alarm", Alarm.Outline, Alarm.Filled),
    Entry("home2", Home2.Outline, Home2.Filled),
    Entry("loader", Loader.Outline, Loader.Filled),
    Entry("window-chart-line", WindowChartLine.Outline, WindowChartLine.Filled)
)

@Composable
private fun Catalog() {
    LazyVerticalGrid(
        columns = GridCells.Adaptive(160.dp),
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        horizontalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        items(entries) { entry ->
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Row(horizontalArrangement = Arrangement.spacedBy(24.dp)) {
                    ReiconIcon(entry.outline, contentDescription = entry.name)
                    Icon(entry.filled, contentDescription = null)
                }
                Text(entry.name)
            }
        }
    }
}
