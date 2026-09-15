import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy } from 'reicon-react';
import { SiHtml5, SiJavascript, SiModelcontextprotocol, SiReact, SiSvelte } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { AstroIcon } from './icons';
import { AngularIcon } from '@/components/docs/framework/icons';

function IntegrationCard({ icon, title, lines, copyText, guideUrl }: {
    icon: React.ReactNode;
    title: string;
    lines: React.ReactNode;
    copyText: string;
    guideUrl?: string;
}) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(copyText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    return (
        <div className="bg-text-base/3 rounded-[14px] overflow-hidden flex flex-col">
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-text-base/6">
                <div className="flex items-center gap-2">
                    {guideUrl ? (
                        <Link to={guideUrl} className="flex items-center gap-2 group/title hover:opacity-80 transition-opacity">
                            <div className="w-5 h-5 flex items-center justify-center shrink-0">{icon}</div>
                            <h3 className="text-[14px] font-semibold text-text-base flex items-center gap-0.5">
                                {title}
                            </h3>
                        </Link>
                    ) : (
                        <>
                            <div className="w-5 h-5 flex items-center justify-center shrink-0">{icon}</div>
                            <h3 className="text-[14px] font-semibold text-text-base">{title}</h3>
                        </>
                    )}
                </div>
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-[12px] text-text-base/30 hover:text-text-base/60 transition-colors cursor-pointer shrink-0">
                    {copied ? (
                        <><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>Copied</>
                    ) : (
                        <><Copy size={14} />Copy</>
                    )}
                </button>
            </div>
            {/* Code body — fixed height so all cards are the same */}
            <div className="flex-1 p-5 font-mono text-[13px] leading-[1.85] overflow-x-auto text-text-base">
                {lines}
            </div>
        </div>
    );
}

// ── Shared line helper ────────────────────────────────────────────────────────
function NpmInstall({ pkg }: { pkg: string }) {
    return (
        <div className="mb-2">
            <span className="text-[#ffbd2e]">$</span>
            <span className="text-[#e06c75]"> npm</span>
            <span className="text-text-base/70"> i {pkg}</span>
        </div>
    );
}

function ImportLine({ name, from }: { name: string; from: string }) {
    return (
        <div>
            <span className="text-[#c678dd]">import</span>
            <span className="text-text-base/70">{' { '}</span>
            <span className="text-[#e5c07b]">{name}</span>
            <span className="text-text-base/70">{' } '}</span>
            <span className="text-[#c678dd]">from</span>
            <span className="text-[#98c379]"> '{from}'</span>
            <span className="text-text-base/30">;</span>
        </div>
    );
}

function JsxLine({ tag, props }: { tag: string; props: React.ReactNode }) {
    return (
        <div className="mt-3">
            <span className="text-text-base/20">&lt;</span>
            <span className="text-[#e06c75]">{tag}</span>
            {props}
            <span className="text-text-base/20"> /&gt;</span>
        </div>
    );
}

function Prop({ name, value, isExpr }: { name: string; value: string; isExpr?: boolean }) {
    return (
        <>
            <span className="text-[#d19a66]"> {name}</span>
            <span className="text-text-base/30">=</span>
            {isExpr ? (
                <span className="text-text-base/70">{value}</span>
            ) : (
                <span className="text-[#98c379]">"{value}"</span>
            )}
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Integrations() {
    return (
        <section id="integrations" className="reveal max-w-[1160px] mx-auto px-5 md:px-10 py-13">
            <div className="text-center mb-14">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9B8AFB] mb-2">Integrations</div>
                <h2 className="font-serif text-[clamp(26px,3.6vw,46px)] text-text-base leading-[1.15] tracking-[-0.02em] mb-3">Works everywhere you do.</h2>
                <p className="text-[15px] text-text-base/45 leading-[1.65] max-w-[490px] mx-auto">
                    Easy integration with CDN, React, Angular, React Native, Vue, Astro, Svelte, Flutter, JavaScript, and MCP Server for AI agents.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">

                {/* CDN / HTML */}
                <IntegrationCard
                    icon={<SiHtml5 size={16} color="#E34F26" />}
                    title="CDN / HTML"
                    guideUrl="/docs/vanilla"
                    copyText={`<script src="https://unpkg.com/reicon/cdn/reicon.js"></script>\n\n<re-icon icon="home" size="24"></re-icon>`}
                    lines={<>
                        <div>
                            <span className="text-text-base/20">&lt;</span>
                            <span className="text-[#e06c75]">script</span>
                            <span className="text-[#d19a66]"> src</span>
                            <span className="text-text-base/30">=</span>
                            <span className="text-[#98c379] text-[11px] break-all">"unpkg.com/reicon/cdn/reicon.js"</span>
                            <span className="text-text-base/20">&gt;&lt;/</span>
                            <span className="text-[#e06c75]">script</span>
                            <span className="text-text-base/20">&gt;</span>
                        </div>
                        <div className="mt-3">
                            <span className="text-text-base/20">&lt;</span>
                            <span className="text-[#e06c75]">re-icon</span>
                            <Prop name="icon" value="home" />
                            <Prop name="size" value="24" />
                            <span className="text-text-base/20">&gt;&lt;/</span>
                            <span className="text-[#e06c75]">re-icon</span>
                            <span className="text-text-base/20">&gt;</span>
                        </div>
                    </>}
                />

                {/* Vanilla JS */}
                <IntegrationCard
                    icon={<SiJavascript size={16} color="#f7df1e" />}
                    title="Vanilla JS"
                    guideUrl="/docs/vanilla"
                    copyText={`import { Home } from 'reicon';\n\nconst icon = Home({ size: 24 });\ndocument.body.appendChild(icon);`}
                    lines={<>
                        <NpmInstall pkg="reicon" />
                        <ImportLine name="Home" from="reicon" />
                        <div className="mt-3">
                            <span className="text-[#c678dd]">const</span>
                            <span className="text-text-base/70"> icon = </span>
                            <span className="text-[#61afef]">Home</span>
                            <span className="text-text-base/70">{'({ size: '}</span>
                            <span className="text-[#d19a66]">24</span>
                            <span className="text-text-base/70"> {'});'}</span>
                        </div>
                    </>}
                />

                {/* React */}
                <IntegrationCard
                    icon={<SiReact size={16} color="#61dafb" />}
                    title="React"
                    guideUrl="/docs/react"
                    copyText={`import { Home } from 'reicon-react';\n\n<Home size={24} weight="Outline" />`}
                    lines={<>
                        <NpmInstall pkg="reicon-react" />
                        <ImportLine name="Home" from="reicon-react" />
                        <JsxLine tag="Home" props={<><Prop name="size" value="{24}" isExpr /><Prop name="weight" value="Outline" /></>} />
                    </>}
                />

                {/* Angular */}
                <IntegrationCard
                    icon={<AngularIcon size={16} />}
                    title="Angular"
                    guideUrl="/docs/angular"
                    copyText={`import { Component } from '@angular/core';\nimport { HomeComponent } from 'reicon-angular';\n\n@Component({ imports: [HomeComponent] })\nexport class AppComponent {}\n\n<ri-home [size]="24" weight="Outline"></ri-home>`}
                    lines={<>
                        <NpmInstall pkg="reicon-angular" />
                        <ImportLine name="HomeComponent" from="reicon-angular" />
                        <div className="mt-3">
                            <span className="text-text-base/20">&lt;</span>
                            <span className="text-[#e06c75]">ri-home</span>
                            <Prop name="[size]" value="24" />
                            <Prop name="weight" value="Outline" />
                            <span className="text-text-base/20">&gt;&lt;/</span>
                            <span className="text-[#e06c75]">ri-home</span>
                            <span className="text-text-base/20">&gt;</span>
                        </div>
                    </>}
                />

                {/* React Native */}
                <IntegrationCard
                    icon={<FaReact size={16} color="#61dafb" />}
                    title="React Native"
                    guideUrl="/docs/react-native"
                    copyText={`import { Home } from 'reicon-react-native';\n\n<Home size={24} weight="Outline" />`}
                    lines={<>
                        <NpmInstall pkg="reicon-react-native" />
                        <ImportLine name="Home" from="reicon-react-native" />
                        <JsxLine tag="Home" props={<><Prop name="size" value="{24}" isExpr /><Prop name="weight" value="Outline" /></>} />
                    </>}
                />

                {/* Vue */}
                <IntegrationCard
                    icon={<svg width={16} height={16} viewBox="0 0 122.88 106.42" fill="none"><polygon fill="#4DBA87" points="75.63,0 61.44,24.58 47.25,0 0,0 61.44,106.42 122.88,0 75.63,0" /><polygon fill="#425466" points="75.63,0 61.44,24.58 47.25,0 24.58,0 61.44,63.85 98.3,0 75.63,0" /></svg>}
                    title="Vue"
                    guideUrl="/docs/vue"
                    copyText={`import { Home } from 'reicon-vue';\n\n<Home :size="24" weight="Outline" />`}
                    lines={<>
                        <NpmInstall pkg="reicon-vue" />
                        <ImportLine name="Home" from="reicon-vue" />
                        <JsxLine tag="Home" props={<><Prop name=":size" value="24" /><Prop name="weight" value="Outline" /></>} />
                    </>}
                />

                {/* Astro */}
                <IntegrationCard
                    icon={<AstroIcon size={16} />}
                    title="Astro"
                    guideUrl="/docs/astro"
                    copyText={`import { Home } from 'reicon-astro';\n\n<Home size={24} weight="Outline" />`}
                    lines={<>
                        <NpmInstall pkg="reicon-astro" />
                        <ImportLine name="Home" from="reicon-astro" />
                        <JsxLine tag="Home" props={<><Prop name="size" value="{24}" isExpr /><Prop name="weight" value="Outline" /></>} />
                    </>}
                />

                {/* Svelte */}
                <IntegrationCard
                    icon={<SiSvelte size={16} color="#FF3E00" />}
                    title="Svelte"
                    guideUrl="/docs/svelte"
                    copyText={`import { Home } from 'reicon-svelte';\n\n<Home size={24} weight="Outline" />`}
                    lines={<>
                        <NpmInstall pkg="reicon-svelte" />
                        <ImportLine name="Home" from="reicon-svelte" />
                        <JsxLine tag="Home" props={<><Prop name="size" value="{24}" isExpr /><Prop name="weight" value="Outline" /></>} />
                    </>}
                />

                {/* Flutter */}
                <IntegrationCard
                    icon={<svg width={16} height={16 * (317 / 256)} viewBox="0 0 256 317" fill="none"><path fill="#47C5FB" d="M158 0 0 158l49 48L255 0zM157 145l-85 85 49 50 49-49 85-86z"/><path fill="#00569E" d="m121 280 37 37h97l-85-86z"/><path fill="#00B5F8" d="m72 230 48-48 50 49-49 49z"/></svg>}
                    title="Flutter"
                    guideUrl="/docs/flutter"
                    copyText={`import { Reicon } from 'reicon_flutter';\n\nfinal home = Reicon.outline.home;\nreiconSvg(home, size: 24);`}
                    lines={<>
                        <div className="mb-2">
                            <span className="text-[#ffbd2e]">$</span>
                            <span className="text-[#e06c75]"> flutter</span>
                            <span className="text-text-base/70"> pub add reicon_flutter</span>
                        </div>
                        <div>
                            <span className="text-[#c678dd]">import</span>
                            <span className="text-text-base/70"> 'package:reicon_flutter/reicon_flutter.dart';</span>
                        </div>
                        <div className="mt-3">
                            <span className="text-[#c678dd]">final</span>
                            <span className="text-text-base/70"> home = </span>
                            <span className="text-[#61afef]">Reicon</span>
                            <span className="text-text-base/30">.outline</span>
                            <span className="text-text-base/70">.home;</span>
                        </div>
                    </>}
                />

                {/* MCP Server */}
                <IntegrationCard
                    icon={<SiModelcontextprotocol size={16} color="#9B8AFB" />}
                    title="MCP Server"
                    guideUrl="/docs/mcp"
                    copyText={`{\n  "mcpServers": {\n    "reicon": {\n      "command": "npx",\n      "args": ["reicon-mcp"]\n    }\n  }\n}`}
                    lines={<>
                        <div className="mb-2">
                            <span className="text-[#ffbd2e]">$</span>
                            <span className="text-[#e06c75]"> npx</span>
                            <span className="text-text-base/70"> reicon-mcp</span>
                        </div>
                        <div><span className="text-text-base/30">{'{'}</span></div>
                        <div className="pl-4"><span className="text-[#e5c07b]">"mcpServers"</span><span className="text-text-base/30">: {'{'}</span></div>
                        <div className="pl-8"><span className="text-[#e5c07b]">"reicon"</span><span className="text-text-base/30">: {'{'}</span></div>
                        <div className="pl-12"><span className="text-[#e5c07b]">"command"</span><span className="text-text-base/30">: </span><span className="text-[#98c379]">"npx"</span><span className="text-text-base/30">,</span></div>
                        <div className="pl-12"><span className="text-[#e5c07b]">"args"</span><span className="text-text-base/30">: [</span><span className="text-[#98c379]">"reicon-mcp"</span><span className="text-text-base/30">]</span></div>
                        <div className="pl-8"><span className="text-text-base/30">{'}'}</span></div>
                        <div className="pl-4"><span className="text-text-base/30">{'}'}</span></div>
                        <div><span className="text-text-base/30">{'}'}</span></div>
                    </>}
                />

            </div>
        </section>
    );
}
