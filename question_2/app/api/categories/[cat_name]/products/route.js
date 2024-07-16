export async function GET(req, {params}) {
    let client_json = {
        "companyName": "yoyoyo",
        "clientID": "2c5a3ab0-607e-49a3-813e-29f8dcf6fadc",
        "clientSecret": "YPElqhLZqjBxzwKf",
        "ownerName": "chidam",
        "ownerEmail": "125018016@sastra.ac.in",
        "rollNo": "125018016"
    }
    let response =await fetch("http://20.244.56.144/test/auth",{
        method:"POST",
        body:JSON.stringify(client_json)
    }
    )
    let data = await response.json()
    let access_token = data["access_token"]
    let sp = req.nextUrl.searchParams
    const companies =["AMZ", "FLP", "SNP", "ΜΥΝ", "ΑΖΟ"]
    const cats = [ "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"]
    const catName = params.cat_name
    if(!cats.includes(catName)){
        return Response.json({error:"Send a proper catname"})
    }
    const  n = parseInt(sp.get("n"))
    let page = parseInt(sp.get("page"))
    if(Number.isNaN(n)){
        return Response.json({error:"Send n"})
    }
    if(n>10 && page===NaN){
        return Response.json({error:"Send page"})
    }
    let outputs = []

    // didn't want to deal with headace of for loops in time limitation lol
    let ramz = await fetch(`http://20.244.56.144/test/companies/AMZ/categories/${catName}/products?top=${n}&minPrice=1&maxPrice=10000`,{
        headers:{
            "Authorization":`Bearer ${access_token}`
        }
    })
    let amz = await ramz.json()
    let rflp = await fetch(`http://20.244.56.144/test/companies/FLP/categories/${catName}/products?top=${n}&minPrice=1&maxPrice=10000`,{
        headers:{
            "Authorization":`Bearer ${access_token}`
        }
    })
    let flp  = await rflp.json()
    let rsnp = await fetch(`http://20.244.56.144/test/companies/SNP/categories/${catName}/products?top=${n}&minPrice=1&maxPrice=10000`,{
        headers:{
            "Authorization":`Bearer ${access_token}`
        }
    })
    let snp = await rsnp.json()
    let rmyn = await fetch(`http://20.244.56.144/test/companies/MYN/categories/${catName}/products?top=${n}&minPrice=1&maxPrice=10000`,{
        headers:{
            "Authorization":`Bearer ${access_token}`
        }
    })
    let myn = await rmyn.json()
    let razo = await fetch(`http://20.244.56.144/test/companies/AZO/categories/${catName}/products?top=${n}&minPrice=1&maxPrice=10000`,{
        headers:{
            "Authorization":`Bearer ${access_token}`
        }
    })
    let azo = await razo.json()
    console.log(amz.errors)
    try{
        outputs = [...amz,...azo,...flp,...myn,...snp]
    }catch(e){
        console.log({e})
        return Response.json({e})
    }
    outputs.sort((product)=>{
        return product["rating"]
    })
    if(n<11){
        return Response.json(outputs.slice(0,11))
    }
    let out = outputs.slice(page*10,page*10+11)
    return Response.json(out)
}