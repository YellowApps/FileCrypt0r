var shell = WScript.CreateObject("WScript.Shell");
var fs = WScript.CreateObject("Scripting.FileSystemObject");
var alphabet = ['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'];
var symbs = [];
var file;

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

try{
	file = fs.GetFile("key.json").OpenAsTextStream(2, -1);
}catch(e){
	file = fs.CreateTextFile("key.json", false, true);
}

file.WriteLine("{");

for(var i = 100; i < 50000; i++){
	symbs.push(String.fromCharCode(i));
}

for(var i in alphabet){
	var index = Math.floor(Math.random() * symbs.length - 2);
	var chr = symbs[index];
	if(!chr || chr == "undefined" ||  index == "" || isNumeric(index)){
		index = Math.floor(Math.random() * symbs.length - 2);
		chr = symbs[index];
	}
	file.WriteLine('\t"' + alphabet[i] + '": "' + chr + (alphabet[i] == "я" ? '" ' : '", '));
	delete symbs[index];
}

file.WriteLine("}");

file.Close();

WScript.Echo("Done.");