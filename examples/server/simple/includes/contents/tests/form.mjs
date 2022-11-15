import { BadRequestException } from "../../../../../../model/BadRequestException.mjs";

export function displayFormController(req, res) {
    if(req.method == "POST") {
        if(req.body.firstname == "" || req.body.lastname == "") {
            throw new BadRequestException("This page requires a firstname and lastname parameter!");
        } else {
            res.fullname = req.body.firstname + " " + req.body.lastname;
        }
    }
}

export function displayFormContents(req, res) {
    if(res.fullname) {
        res.write("<p>Hi, I believe your full name is: " + res.fullname + "</p>\n");
    } else {
        res.write("<p>Please enter your name:</p>\n");
        res.write('<form action="" method="post">\n');
        res.write("\t<p>\n");
        res.write('\t\t<label>First name:</label>\n');
        res.write('\t\t<input type="text" name="firstname">\n');
        res.write("\t</p>\n");
        res.write("\t<p>\n");
        res.write('\t\t<label>Last name:</label>\n');
        res.write('\t\t<input type="text" name="lastname">\n');
        res.write("\t</p>\n");
        res.write("\t<p>\n");
        res.write('\t\t<button type="submit">Submit</button>\n');
        res.write("\t</p>\n");
        res.write("</form>\n");
    }
}
