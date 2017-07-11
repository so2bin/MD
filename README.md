# MD
> sublime markdown naviation with sublime-markdown-naviation

1. 两个文件md.js, md.css;
2. 将这个两个文件,保存到: sublime text3>Packages>OmniMarkupPreviewer>public>MD文件夹;
3. 在sublime的.md文档后面, 添加如下两行: 
4. 为了方便开发,这里引入了OmniMarkupPreviewer>public里面的jQuery.min.js, 我这的版本是2.1.3

```javascript
	<link rel='stylesheet' type='text/css' href='/public/MD/md.css'>
	<script type='text/javascript' src='/public/MD/md.js'><script>
	<script type='text/javascript' src='/public/jquery-2.1.3.min.js'><script>
```
5. OK;