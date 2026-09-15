import SyntaxBlock from '@/components/docs/SyntaxBlock';

interface Props {
    onCopy: (text: string, field: string) => void;
    copiedField: string | null;
}

export default function Theming({ onCopy, copiedField }: Props) {
    return (
        <>
            {/* React Navigation Example */}
            <h3 className="text-lg font-serif text-text-base mb-4 mt-10">React Navigation Tab Icons</h3>
            <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
                Reicon works seamlessly with React Navigation. Use different weights to indicate active/inactive tabs.
            </p>

            <SyntaxBlock
                title="Navigation Example"
                onCopy={() => onCopy("import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';\nimport { Home, Search, User } from 'reicon-react-native';\n\nconst Tab = createBottomTabNavigator();\n\nfunction AppTabs() {\n  return (\n    <Tab.Navigator\n      screenOptions={({ route }) => ({\n        tabBarIcon: ({ focused, color, size }) => {\n          let Icon;\n          if (route.name === 'Home') Icon = Home;\n          else if (route.name === 'Search') Icon = Search;\n          else Icon = User;\n          \n          return <Icon size={size} color={color} weight={focused ? 'Filled' : 'Outline'} />;\n        },\n      })}\n    >\n      <Tab.Screen name=\"Home\" component={HomeScreen} />\n      <Tab.Screen name=\"Search\" component={SearchScreen} />\n      <Tab.Screen name=\"Profile\" component={ProfileScreen} />\n    </Tab.Navigator>\n  );\n}", 'rn-nav')}
                copied={copiedField === 'rn-nav'}
            >
                <span className="text-[#c678dd]">import</span>
                <span className="text-text-base/70">{' { '}</span>
                <span className="text-[#e5c07b]">createBottomTabNavigator</span>
                <span className="text-text-base/70">{' } '}</span>
                <span className="text-[#c678dd]">from</span>
                <span className="text-[#98c379]"> '@react-navigation/bottom-tabs'</span>
                <span className="text-text-base/30">;</span>
                {'\n'}
                <span className="text-[#c678dd]">import</span>
                <span className="text-text-base/70">{' { '}</span>
                <span className="text-[#e5c07b]">Home</span><span className="text-text-base/70">, </span>
                <span className="text-[#e5c07b]">Search</span><span className="text-text-base/70">, </span>
                <span className="text-[#e5c07b]">User</span>
                <span className="text-text-base/70">{' } '}</span>
                <span className="text-[#c678dd]">from</span>
                <span className="text-[#98c379]"> 'reicon-react-native'</span>
                <span className="text-text-base/30">;</span>
                {'\n\n'}
                <span className="text-[#c678dd]">const</span><span className="text-[#e5c07b]"> Tab</span><span className="text-text-base/70"> = </span><span className="text-[#61afef]">createBottomTabNavigator</span><span className="text-text-base/70">();</span>
                {'\n\n'}
                <span className="text-[#c678dd]">function</span><span className="text-[#61afef]"> AppTabs</span><span className="text-text-base/70">() {'{'}</span>
                {'\n  '}
                <span className="text-[#c678dd]">return</span><span className="text-text-base/70"> (</span>
                {'\n    '}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Tab.Navigator</span>
                {'\n      '}
                <span className="text-[#d19a66]">screenOptions</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}({'{'} route {'}'}) =&gt; ({'{'}</span>
                {'\n        '}
                <span className="text-[#d19a66]">tabBarIcon</span><span className="text-text-base/70">: ({'{'} focused, color, size {'}'}) =&gt; {'{'}</span>
                {'\n          '}
                <span className="text-text-base/30">// ... Icon selection logic</span>
                {'\n          '}
                <span className="text-[#c678dd]">return</span><span className="text-text-base/70"> {'<'}</span><span className="text-[#e06c75]">Icon</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}</span><span className="text-[#e5c07b]">focused</span><span className="text-text-base/70"> ? </span><span className="text-[#98c379]">'Filled'</span><span className="text-text-base/70"> : </span><span className="text-[#98c379]">'Outline'</span><span className="text-text-base/70">{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
                {'\n        '}
                <span className="text-text-base/70">{'}'}</span>
                {'\n      '}
                <span className="text-text-base/70">{'})'}'</span>
                {'\n    '}
                <span className="text-text-base/70">{'>'}</span>
                {'\n      '}
                <span className="text-text-base/30">{'// Tab screens...'}</span>
                {'\n    '}
                <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">Tab.Navigator</span><span className="text-text-base/70">{'>'}</span>
                {'\n  '}
                <span className="text-text-base/70">);</span>
                {'\n'}
                <span className="text-text-base/70">{'}'}</span>
            </SyntaxBlock>

            {/* Pressable Icons */}
            <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Touchable/Pressable Icons</h3>
            <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
                Wrap icons in Pressable or TouchableOpacity for interactive buttons with dynamic states.
            </p>

            <SyntaxBlock
                title="Pressable Example"
                onCopy={() => onCopy("import { Pressable } from 'react-native';\nimport { Heart } from 'reicon-react-native';\n\nfunction LikeButton() {\n  const [liked, setLiked] = useState(false);\n  \n  return (\n    <Pressable onPress={() => setLiked(!liked)}>\n      <Heart\n        weight={liked ? 'Filled' : 'Outline'}\n        color={liked ? '#ef4444' : '#6b7280'}\n        size={28}\n      />\n    </Pressable>\n  );\n}", 'rn-pressable')}
                copied={copiedField === 'rn-pressable'}
            >
                <span className="text-[#c678dd]">import</span>
                <span className="text-text-base/70">{' { '}</span>
                <span className="text-[#e5c07b]">Pressable</span>
                <span className="text-text-base/70">{' } '}</span>
                <span className="text-[#c678dd]">from</span>
                <span className="text-[#98c379]"> 'react-native'</span>
                <span className="text-text-base/30">;</span>
                {'\n'}
                <span className="text-[#c678dd]">import</span>
                <span className="text-text-base/70">{' { '}</span>
                <span className="text-[#e5c07b]">Heart</span>
                <span className="text-text-base/70">{' } '}</span>
                <span className="text-[#c678dd]">from</span>
                <span className="text-[#98c379]"> 'reicon-react-native'</span>
                <span className="text-text-base/30">;</span>
                {'\n\n'}
                <span className="text-[#c678dd]">function</span><span className="text-[#61afef]"> LikeButton</span><span className="text-text-base/70">() {'{'}</span>
                {'\n  '}
                <span className="text-[#c678dd]">const</span><span className="text-text-base/70"> [</span><span className="text-[#e5c07b]">liked</span><span className="text-text-base/70">, </span><span className="text-[#e5c07b]">setLiked</span><span className="text-text-base/70">] = </span><span className="text-[#61afef]">useState</span><span className="text-text-base/70">(</span><span className="text-[#d19a66]">false</span><span className="text-text-base/70">);</span>
                {'\n  \n  '}
                <span className="text-[#c678dd]">return</span><span className="text-text-base/70"> (</span>
                {'\n    '}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Pressable</span><span className="text-[#d19a66]"> onPress</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}</span><span className="text-text-base/70">() =&gt; </span><span className="text-[#61afef]">setLiked</span><span className="text-text-base/70">(!</span><span className="text-[#e5c07b]">liked</span><span className="text-text-base/70">)</span><span className="text-text-base/70">{'}'}</span><span className="text-text-base/70">{'>'}</span>
                {'\n      '}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span>
                {'\n        '}
                <span className="text-[#d19a66]">weight</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}</span><span className="text-[#e5c07b]">liked</span><span className="text-text-base/70"> ? </span><span className="text-[#98c379]">'Filled'</span><span className="text-text-base/70"> : </span><span className="text-[#98c379]">'Outline'</span><span className="text-text-base/70">{'}'}</span>
                {'\n        '}
                <span className="text-[#d19a66]">color</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}</span><span className="text-[#e5c07b]">liked</span><span className="text-text-base/70"> ? </span><span className="text-[#98c379]">'#ef4444'</span><span className="text-text-base/70"> : </span><span className="text-[#98c379]">'#6b7280'</span><span className="text-text-base/70">{'}'}</span>
                {'\n        '}
                <span className="text-[#d19a66]">size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}28{'}'}</span>
                {'\n      '}
                <span className="text-text-base/70">/{'>'}</span>
                {'\n    '}
                <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">Pressable</span><span className="text-text-base/70">{'>'}</span>
                {'\n  '}
                <span className="text-text-base/70">);</span>
                {'\n'}
                <span className="text-text-base/70">{'}'}</span>
            </SyntaxBlock>
        </>
    );
}
