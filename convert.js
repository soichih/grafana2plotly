#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');

program
.version('0.0.0')
.arguments('<csv_path> <key> [opt]')
.action((csv_path, key, opt)=>{
    console.log(csv_path, key);

    if(!csv_path) throw new Error("please specify csv file path");

    let data = {};
    let csv = fs.readFileSync(csv_path, "ascii");
    csv.split("\n").splice(1).forEach(row=>{
        row = row.trim();
        let cols = row.split(";");
        let key = cols[0].substring(1, cols[0].length-1);
        //let time = Date.parse(cols[1].substring(1, 26));
        let time = cols[1].substring(1, 26);
        let value = parseFloat(cols[2]);
        if(isNaN(value)) return;
        //if(value == 0) return;
        if(!data[key]) data[key] = {x: [], y: []};
        data[key].x.push(time);
        data[key].y.push(value);
    });

    //output graph.js!
    let traces = [];
    for(let key in data) {
        traces.push({
            type: "scatter",
            mode: "lines",
            line: {
                width: 1,
            },
            name: key,
            x: data[key].x,
            y: data[key].y,
            fill: 'tozeroy',
            //fill: 'tonexty',
            //line: {color: "#77ff00"}
        });
    }
    let out = fs.createWriteStream(csv_path+".js", "ascii");
    out.write("const "+key+" = "+JSON.stringify(traces)+"\n");
});

program.parse(process.argv);


