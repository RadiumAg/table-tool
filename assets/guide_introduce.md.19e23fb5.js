import{ai as s,o as l,c as a,e as n}from"./app.7044008c.js";const i=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":3,"title":"Why?","slug":"why","link":"#why","children":[]},{"level":3,"title":"How?","slug":"how","link":"#how","children":[]},{"level":3,"title":"","slug":"","link":"#","children":[]},{"level":3,"title":"","slug":"-1","link":"#-1","children":[]}],"relativePath":"guide/introduce.md"}'),o={name:"guide/introduce.md"},p=n(`<h3 id="why" tabindex="-1">Why? <a class="header-anchor" href="#why" aria-hidden="true">#</a></h3><p>\u50CF<code>element-plus</code> \u7684 <a href="https://element-plus.org/zh-CN/component/table.html" target="_blank" rel="noreferrer">ElTable</a>\u8FD9\u79CD\u8868\u683C\uFF0C\u672C\u8EAB\u5E76\u6CA1\u6709<code>\u7F16\u8F91\u63D2\u69FD</code>,<code>\u6821\u9A8C</code>\u529F\u80FD\uFF0C\u5F00\u53D1\u65F6\u5E26\u6765\u4E86\u5F88\u5927\u7684\u4E0D\u4FBF\uFF0C\u6240\u4EE5\u5982\u679C\u6709\u989D\u5916\u7684\u65B9\u5F0F\u53EF\u4EE5\u5B9E\u73B0\u8FD9\u4E9B\u529F\u80FD\uFF0C\u90A3\u4E48\u5C31\u53EF\u4EE5\u5728\u4E0D\u66F4\u6362<code>\u8868\u683C</code>\u7684\u60C5\u51B5\u4E0B\u5E26\u6765\u66F4\u597D\u7684<code>\u5F00\u53D1\u4F53\u9A8C</code>\u3002\u8FD9\u5C31\u662F<a href="https://github.com/RadiumAg/table-tool" target="_blank" rel="noreferrer">Table Tool</a>\u7684\u7531\u6765\u3002</p><h3 id="how" tabindex="-1">How? <a class="header-anchor" href="#how" aria-hidden="true">#</a></h3><p><a href="https://github.com/RadiumAg/table-tool" target="_blank" rel="noreferrer">Table Tool</a> \u53EF\u4EE5\u7B80\u5355\u5FEB\u901F\u7684\u5E2E\u52A9\u8868\u683C\u5B9E\u73B0<code>\u7F16\u8F91</code> \u529F\u80FD\uFF0C\u4EE5<a href="https://element-plus.org/zh-CN/component/table.html" target="_blank" rel="noreferrer">ElTable</a>\u4E3A\u4F8B\uFF0C\u53EA\u8981\u5728<code>&lt;el-table-column</code>\u4E2D\u63D2\u5165<code>Cell</code>\u7EC4\u4EF6\u5C31\u53EF\u4EE5\u5B9E\u73B0\uFF1A</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Cell</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">table-tool-vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">column</span></span>
<span class="line"><span style="color:#A6ACCD;">      prop</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      label</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u540D\u79F0</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      width</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">200px</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      show</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">overflow</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">tooltip</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">template #</span><span style="color:#89DDFF;">default</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{ row }</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">edit</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">cell</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">row</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">row</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> field</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">input v</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">row.name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">&lt;/</span><span style="color:#FFCB6B;">el</span><span style="color:#A6ACCD;">-</span><span style="color:#FFCB6B;">input</span><span style="color:#A6ACCD;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">edit</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">cell</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">column</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">...</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>\u8BE6\u60C5\u8BF7\u67E5\u770B<a href="https://radiumag.github.io/table-tool/guide/edit-cell.html" target="_blank" rel="noreferrer">\u8868\u683C\u7F16\u8F91</a></p></div><p>\u5F53\u7136\uFF0C\u5728<code>\u65E5\u5E38</code>\u5F00\u53D1\u4E2D\uFF0C<code>\u8868\u683C\u9A8C\u8BC1</code>\u4E5F\u662F\u5FC5\u4E0D\u53EF\u5C11\u7684\uFF0C<a href="https://github.com/RadiumAg/table-tool" target="_blank" rel="noreferrer">Table Tool</a> \u63D0\u4F9B\u4E86<code>Tool</code>\u7EC4\u4EF6\uFF0C\u6765\u5FEB\u901F\u7684\u5B9E\u73B0\u6821\u9A8C\uFF1A</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Cell</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Tool</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">table-tool-vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">template</span><span style="color:#A6ACCD;">&gt; </span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">tool</span><span style="color:#A6ACCD;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">column</span></span>
<span class="line"><span style="color:#A6ACCD;">       prop</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">       label</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u540D\u79F0</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">       width</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">200px</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">       :edit</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">rules</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[{ required: true, message: &#39;\u540D\u79F0\u5FC5\u586B&#39; }]</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">       show</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">overflow</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">tooltip</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">template #</span><span style="color:#89DDFF;">default</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{ row }</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">edit</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">cell</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">row</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">row</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> field</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">           </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">input v</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">row.name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">&lt;/</span><span style="color:#FFCB6B;">el</span><span style="color:#A6ACCD;">-</span><span style="color:#FFCB6B;">input</span><span style="color:#A6ACCD;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">edit</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">cell</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">column</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">tool</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;">template</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u5C06<code>Tool</code>\u7EC4\u4EF6\u5957\u5728<code>ElTable</code>\u4E4B\u540E\uFF0C\u53EA\u9700\u8981\u83B7\u53D6<code>Tool</code>\u7684\u5B9E\u4F8B\u5E76\u8C03\u7528<code>validate</code>\u5C31\u80FD\u5B9E\u73B0<code>\u6821\u9A8C</code>\uFF1A</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"> toolRef</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">validate</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>\u8BE6\u60C5\u8BF7\u67E5\u770B<a href="https://radiumag.github.io/table-tool/guide/validate.html" target="_blank" rel="noreferrer">\u8868\u683C\u9A8C\u8BC1</a></p></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h3><h3 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a></h3>`,13),e=[p];function t(c,r,D,F,y,C){return l(),a("div",null,e)}const d=s(o,[["render",t]]);export{i as __pageData,d as default};