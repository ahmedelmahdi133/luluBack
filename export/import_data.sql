-- ==========================================
-- PostgreSQL Data Import Script
-- Run with: psql -h localhost -p 5432 -U postgres -d index -f "d:\merged\indexDataBase\export\import_data.sql"
-- ==========================================
-- Import dbo.Account_Tree (113 rows)
\COPY "mdf_account_tree" FROM 'd:/merged/indexDataBase/export/dbo_Account_Tree.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.barcode_temp (2 rows)
\COPY "mdf_barcode_temp" FROM 'd:/merged/indexDataBase/export/dbo_barcode_temp.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Cash_depots (5 rows)
\COPY "mdf_cash_depots" FROM 'd:/merged/indexDataBase/export/dbo_Cash_depots.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Co_bank (2 rows)
\COPY "mdf_co_bank" FROM 'd:/merged/indexDataBase/export/dbo_Co_bank.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.co_inf (1 rows)
\COPY "mdf_co_inf" FROM 'd:/merged/indexDataBase/export/dbo_co_inf.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Companys (1370 rows)
\COPY "mdf_companys" FROM 'd:/merged/indexDataBase/export/dbo_Companys.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Customer_Area (1 rows)
\COPY "mdf_customer_area" FROM 'd:/merged/indexDataBase/export/dbo_Customer_Area.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Customer_Class (2 rows)
\COPY "mdf_customer_class" FROM 'd:/merged/indexDataBase/export/dbo_Customer_Class.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.DB_online_update_Error (13 rows)
\COPY "mdf_db_online_update_error" FROM 'd:/merged/indexDataBase/export/dbo_DB_online_update_Error.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.EMP_CONTROL (1 rows)
\COPY "mdf_emp_control" FROM 'd:/merged/indexDataBase/export/dbo_EMP_CONTROL.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Employee (1 rows)
\COPY "mdf_employee" FROM 'd:/merged/indexDataBase/export/dbo_Employee.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Employee_daily_time (2 rows)
\COPY "mdf_employee_daily_time" FROM 'd:/merged/indexDataBase/export/dbo_Employee_daily_time.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Flag (55 rows)
\COPY "mdf_flag" FROM 'd:/merged/indexDataBase/export/dbo_Flag.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Jobs (8 rows)
\COPY "mdf_jobs" FROM 'd:/merged/indexDataBase/export/dbo_Jobs.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Product_description (412 rows)
\COPY "mdf_product_description" FROM 'd:/merged/indexDataBase/export/dbo_Product_description.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Product_Dose (2 rows)
\COPY "mdf_product_dose" FROM 'd:/merged/indexDataBase/export/dbo_Product_Dose.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Product_groups (250 rows)
\COPY "mdf_product_groups" FROM 'd:/merged/indexDataBase/export/dbo_Product_groups.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Product_units (46 rows)
\COPY "mdf_product_units" FROM 'd:/merged/indexDataBase/export/dbo_Product_units.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Products (41047 rows)
\COPY "mdf_products" FROM 'd:/merged/indexDataBase/export/dbo_Products.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Sale_classes (2 rows)
\COPY "mdf_sale_classes" FROM 'd:/merged/indexDataBase/export/dbo_Sale_classes.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Shortcoming (4938 rows)
\COPY "mdf_shortcoming" FROM 'd:/merged/indexDataBase/export/dbo_Shortcoming.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Sites (1 rows)
\COPY "mdf_sites" FROM 'd:/merged/indexDataBase/export/dbo_Sites.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Stores (2 rows)
\COPY "mdf_stores" FROM 'd:/merged/indexDataBase/export/dbo_Stores.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Tuning_accounts_reason (6 rows)
\COPY "mdf_tuning_accounts_reason" FROM 'd:/merged/indexDataBase/export/dbo_Tuning_accounts_reason.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.user_login (3 rows)
\COPY "mdf_user_login" FROM 'd:/merged/indexDataBase/export/dbo_user_login.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.Vendor (1 rows)
\COPY "mdf_vendor" FROM 'd:/merged/indexDataBase/export/dbo_Vendor.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Import dbo.versions (16 rows)
\COPY "mdf_versions" FROM 'd:/merged/indexDataBase/export/dbo_versions.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');


