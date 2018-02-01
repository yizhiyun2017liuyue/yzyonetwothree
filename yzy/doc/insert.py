import xlrd
import MySQLdb

connn = MySQLdb.connect(host="localhost", user="root", passwd="123.com", port=3306, charset='utf8')
curr = connn.cursor()
try:
    curr.execute("drop database IF EXISTS uinfo")
except Exception:
    pass
curr.execute("CREATE  DATABASE uinfo CHARACTER SET  utf8  COLLATE utf8_general_ci")
curr.close()
connn.commit()
connn.close()

# Open the workbook and define the worksheet
book = xlrd.open_workbook("./new1.xls")
sheet = book.sheet_by_index(0)

database = MySQLdb.connect(host="localhost", user="root", passwd="123.com", db="uinfo", port=3306, charset='utf8')
cursor = database.cursor()

createSql = '''create table assets(
id int primary key AUTO_INCREMENT,
certificate int,
assetnum varchar(50),
subjectcode varchar(50),
assetname varchar(50),
recorddate datetime,
models varchar(50),
abstracts varchar(50),
primprice float,
primnum float,
primamount float,
access varchar(50),
mdepartment varchar(50),
fdepartment varchar(50),
udepartment varchar(50),
ustatus varchar(50),
saveman varchar(50),
orderno int,
usefixedyear int,
nownum float,
nowprice float,
fored varchar(50),
accountingnum varchar(50),
bookedicon varchar(50),
nullifyicon varchar(50),
recordman varchar(50),
sourcemd varchar(50),
area varchar(50),
itemcode varchar(50)
)'''

cursor.execute(createSql)

sql = '''INSERT INTO assets (certificate, assetnum, subjectcode, assetname, recorddate, models, abstracts, primprice, primnum,
primamount , access, mdepartment, fdepartment, udepartment, ustatus, saveman, orderno, usefixedyear, nownum, nowprice, fored,
accountingnum, bookedicon, nullifyicon, recordman, sourcemd, area, itemcode) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''

for r in range(3, sheet.nrows):
    values = []
    for i in range(28):
        if not sheet.cell(r, i).value:
            values.append(None)
        else:
            if i == 4:
                values.append(xlrd.xldate.xldate_as_datetime(sheet.cell(r, i).value, 0))
            else:
                values.append(sheet.cell(r, i).value)
    values = tuple(values)
    cursor.execute(sql, values)

cursor.close()
database.commit()
database.close()
print('over....')
