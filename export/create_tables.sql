-- ==========================================
-- PostgreSQL DDL generated from SQL Server MDF
-- Source: d:\merged\indexDataBase\stock_Data.MDF
-- Generated: 2026-06-28 20:13:40
-- ==========================================
-- Source: [dbo].[Account_Tree]
CREATE TABLE IF NOT EXISTS "mdf_account_tree" (
    "account_id" NUMERIC(18,0) NOT NULL,
    "account_code" VARCHAR(20),
    "account_name_ar" VARCHAR(50),
    "account_name_en" VARCHAR(50),
    "account_major" NUMERIC(18,0),
    "account_start_money" NUMERIC(19,4),
    "insert_uid" VARCHAR(9),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(9),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Back_purchase_details]
CREATE TABLE IF NOT EXISTS "mdf_back_purchase_details" (
    "back_purchase_id" NUMERIC(18,0) NOT NULL,
    "details_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "amount" DOUBLE PRECISION,
    "exp_date" TIMESTAMP,
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Back_purchase_header]
CREATE TABLE IF NOT EXISTS "mdf_back_purchase_header" (
    "back_purchase_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "vendor_id" NUMERIC(18,0),
    "total" NUMERIC(19,4),
    "class" CHAR(1),
    "bill_number" VARCHAR(20),
    "gf_id" NUMERIC(18,0),
    "product_number" INTEGER,
    "notes" TEXT,
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Back_Sales_details]
CREATE TABLE IF NOT EXISTS "mdf_back_sales_details" (
    "back_sales_id" NUMERIC(18,0) NOT NULL,
    "sales_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "exp_date" TIMESTAMP,
    "sell_price" NUMERIC(19,4) NOT NULL,
    "buy_price" NUMERIC(19,4),
    "back_amount" DOUBLE PRECISION,
    "back_unit_change" NUMERIC(18,0),
    "back_price" NUMERIC(19,4),
    "back_unit" INTEGER,
    "back_gf_id" NUMERIC(18,0),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "disc_per" DOUBLE PRECISION,
    "disc_money" NUMERIC(19,4),
    "details_id" NUMERIC(18,0),
    "back_sales_details_id" NUMERIC(18,0) NOT NULL
);

-- Source: [dbo].[Back_sales_header]
CREATE TABLE IF NOT EXISTS "mdf_back_sales_header" (
    "back_sales_id" NUMERIC(18,0) NOT NULL,
    "sales_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "customer_id" NUMERIC(18,0),
    "class" INTEGER,
    "r_money_befor" NUMERIC(19,4),
    "s_money_befor" NUMERIC(19,4),
    "r_total_bill" NUMERIC(19,4),
    "s_total_bill" NUMERIC(19,4),
    "total_bill_net" NUMERIC(19,4),
    "total_disc_per" DOUBLE PRECISION,
    "bill_cash" NUMERIC(19,4),
    "cashier_id" NUMERIC(18,0),
    "notes" VARCHAR(200),
    "gf_id" NUMERIC(18,0),
    "contract_id" NUMERIC(18,0),
    "major_customer_part" NUMERIC(19,4),
    "compu_name" VARCHAR(150),
    "cashier_disk_id" NUMERIC(18,0),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "network_id" NUMERIC(18,0),
    "network_money" NUMERIC(19,4),
    "money_change" NUMERIC(19,4),
    "delivery_man_id" NUMERIC(18,0),
    "cashier_money" NUMERIC(19,4)
);

-- Source: [dbo].[barcode_temp]
CREATE TABLE IF NOT EXISTS "mdf_barcode_temp" (
    "co_tel1" VARCHAR(50),
    "co_name1" VARCHAR(50),
    "barcode1" VARCHAR(50),
    "name1" VARCHAR(50),
    "code1" VARCHAR(50),
    "exp1" VARCHAR(50),
    "sell1" VARCHAR(50),
    "co_tel2" VARCHAR(50),
    "co_name2" VARCHAR(50),
    "barcode2" VARCHAR(50),
    "name2" VARCHAR(50),
    "code2" VARCHAR(50),
    "exp2" VARCHAR(50),
    "sell2" VARCHAR(50),
    "co_tel3" VARCHAR(50),
    "co_name3" VARCHAR(50),
    "barcode3" VARCHAR(50),
    "name3" VARCHAR(50),
    "code3" VARCHAR(50),
    "exp3" VARCHAR(50),
    "sell3" VARCHAR(50),
    "co_tel4" VARCHAR(50),
    "co_name4" VARCHAR(50),
    "barcode4" VARCHAR(50),
    "name4" VARCHAR(50),
    "code4" VARCHAR(50),
    "exp4" VARCHAR(50),
    "sell4" VARCHAR(50),
    "co_tel5" VARCHAR(50),
    "co_name5" VARCHAR(50),
    "barcode5" VARCHAR(50),
    "name5" VARCHAR(50),
    "code5" VARCHAR(50),
    "exp5" VARCHAR(50),
    "sell5" VARCHAR(50),
    "co_tel6" VARCHAR(50),
    "co_name6" VARCHAR(50),
    "barcode6" VARCHAR(50),
    "name6" VARCHAR(50),
    "code6" VARCHAR(50),
    "exp6" VARCHAR(50),
    "sell6" VARCHAR(50)
);

-- Source: [dbo].[Branch_money_convert]
CREATE TABLE IF NOT EXISTS "mdf_branch_money_convert" (
    "branch_money_id" NUMERIC(18,0) NOT NULL,
    "from_branch_id" NUMERIC(18,0) NOT NULL,
    "from_cash_id" NUMERIC(18,0) NOT NULL,
    "to_branch_id" NUMERIC(18,0),
    "to_cash_id" NUMERIC(18,0),
    "class" CHAR(1),
    "amount" NUMERIC(19,4),
    "notes" VARCHAR(100),
    "is_open" CHAR(1),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Branch_money_order]
CREATE TABLE IF NOT EXISTS "mdf_branch_money_order" (
    "branch_money_id" NUMERIC(18,0) NOT NULL,
    "bill_id" NUMERIC(18,0) NOT NULL,
    "from_branch_id" NUMERIC(18,0) NOT NULL,
    "from_cash_id" NUMERIC(18,0) NOT NULL,
    "to_branch_id" NUMERIC(18,0),
    "to_cash_id" NUMERIC(18,0),
    "class" CHAR(1),
    "amount" NUMERIC(19,4),
    "notes" VARCHAR(100),
    "is_open" CHAR(1),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Branch_order_details]
CREATE TABLE IF NOT EXISTS "mdf_branch_order_details" (
    "from_branch_id" NUMERIC(18,0) NOT NULL,
    "branch_order_id" NUMERIC(18,0) NOT NULL,
    "details_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0),
    "counter_id" NUMERIC(18,0),
    "amount" NUMERIC(18,3),
    "exp_date" TIMESTAMP,
    "unit_id" NUMERIC(18,0),
    "vendor_id" NUMERIC(18,0),
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "tax_price" NUMERIC(19,4),
    "is_open" CHAR(1),
    "unit_change" DOUBLE PRECISION
);

-- Source: [dbo].[Branch_order_header]
CREATE TABLE IF NOT EXISTS "mdf_branch_order_header" (
    "branch_order_id" NUMERIC(18,0) NOT NULL,
    "bill_id" NUMERIC(18,0) NOT NULL,
    "from_branch_id" NUMERIC(18,0) NOT NULL,
    "from_store_id" NUMERIC(18,0) NOT NULL,
    "to_branch_id" NUMERIC(18,0),
    "to_store_id" NUMERIC(18,0),
    "class" CHAR(1),
    "total_sell_price" NUMERIC(19,4),
    "total_buy_price" NUMERIC(19,4),
    "product_number" INTEGER,
    "notes" VARCHAR(100),
    "is_open" CHAR(1),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Branches]
CREATE TABLE IF NOT EXISTS "mdf_branches" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "branch_code" VARCHAR(20),
    "branch_name" VARCHAR(50),
    "branch_address" VARCHAR(100),
    "branch_tel" VARCHAR(20),
    "branch_mobile" VARCHAR(20),
    "active" CHAR(1),
    "branch_ip1" VARCHAR(20),
    "branch_ip2" VARCHAR(20),
    "rep_last_sales_id" NUMERIC(18,0),
    "rep_sales_date" TIMESTAMP,
    "rep_last_purchase_id" NUMERIC(18,0),
    "rep_purchase_date" TIMESTAMP,
    "rep_last_shortcoming_id" NUMERIC(18,0),
    "rep_shortcoming_date" TIMESTAMP,
    "rep_last_product_id" NUMERIC(18,0),
    "rep_last_product_date" TIMESTAMP,
    "rep_last_cash_disk_id" NUMERIC(18,0),
    "rep_cash_disk_date" TIMESTAMP,
    "rep_back_purchase_id" NUMERIC(18,0),
    "rep_back_purchase_date" TIMESTAMP,
    "rep_store_id" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "rep_last_unit_id" NUMERIC(18,0),
    "rep_last_group_id" NUMERIC(18,0),
    "rep_last_pd_id" NUMERIC(18,0),
    "rep_last_company_id" NUMERIC(18,0),
    "rep_last_unit_date" TIMESTAMP,
    "rep_last_group_date" TIMESTAMP,
    "rep_last_pd_date" TIMESTAMP,
    "rep_last_company_date" TIMESTAMP,
    "rep_last_pa_id" NUMERIC(18,0),
    "rep_last_pa_date" TIMESTAMP,
    "rep_last_customer_id" NUMERIC(18,0),
    "rep_customer_date" TIMESTAMP,
    "rep_last_vendor_id" NUMERIC(18,0),
    "rep_vendor_date" TIMESTAMP,
    "rep_last_cash_disk_close_id" NUMERIC(18,0),
    "rep_cash_disk_close_date" TIMESTAMP,
    "is_server" CHAR(1),
    "barcode_name" VARCHAR(50),
    "barcode_tel" VARCHAR(50),
    "rep_last_master_pa_id" NUMERIC(18,0),
    "rep_last_master_pa_date" TIMESTAMP,
    "rep_last_emp_id" NUMERIC(18,0),
    "rep_last_emp_date" TIMESTAMP,
    "rep_last_pa_ch_id" NUMERIC(18,0),
    "rep_last_master_pa_ch_id" NUMERIC(18,0),
    "rep_last_sales_details_id" NUMERIC(18,0)
);

-- Source: [dbo].[Branches_back_purchase_details]
CREATE TABLE IF NOT EXISTS "mdf_branches_back_purchase_details" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "back_purchase_id" NUMERIC(18,0) NOT NULL,
    "details_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "amount" NUMERIC(18,3),
    "exp_date" TIMESTAMP,
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "unit_id" NUMERIC(18,0),
    "unit_ch" NUMERIC(18,0)
);

-- Source: [dbo].[Branches_back_purchase_header]
CREATE TABLE IF NOT EXISTS "mdf_branches_back_purchase_header" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "back_purchase_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "vendor_id" NUMERIC(18,0),
    "total" NUMERIC(19,4),
    "class" CHAR(1),
    "bill_number" VARCHAR(20),
    "gf_id" NUMERIC(18,0),
    "product_number" INTEGER,
    "notes" VARCHAR(150),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Branches_cash_depots]
CREATE TABLE IF NOT EXISTS "mdf_branches_cash_depots" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "cash_depot_id" NUMERIC(18,0) NOT NULL,
    "cash_depot_code" VARCHAR(10),
    "cash_depot_name_ar" VARCHAR(50),
    "cash_depot_name_en" VARCHAR(50),
    "cash_depot_class" CHAR(1),
    "cash_depot_current_money" NUMERIC(19,4),
    "account_number" VARCHAR(50),
    "bank_id" NUMERIC(18,0),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Branches_Cash_disk_close]
CREATE TABLE IF NOT EXISTS "mdf_branches_cash_disk_close" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "cdc_id" NUMERIC(18,0) NOT NULL,
    "cdc_cash_id" NUMERIC(18,0),
    "cdc_emp_id" NUMERIC(18,0),
    "cdc_shift_start_time" TIMESTAMP,
    "cdc_start_cash" NUMERIC(19,4),
    "cdc_curr_cash" NUMERIC(19,4),
    "cdc_act_cash" NUMERIC(19,4),
    "cdc_to_emp_id" NUMERIC(18,0),
    "cdc_fcs_id" NUMERIC(18,0),
    "cdc_trans_value" NUMERIC(19,4),
    "cdc_notice" VARCHAR(100),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "last_gf_id" NUMERIC(18,0)
);

-- Source: [dbo].[Branches_company_edit]
CREATE TABLE IF NOT EXISTS "mdf_branches_company_edit" (
    "company_edit_id" NUMERIC(18,0) NOT NULL,
    "insert_type" CHAR(1),
    "company_id" NUMERIC(18,0),
    "company_code" VARCHAR(10),
    "co_name_ar" VARCHAR(50),
    "co_name_en" VARCHAR(50),
    "mobile" VARCHAR(20),
    "tel" VARCHAR(20),
    "address" VARCHAR(100),
    "deleted" CHAR(1),
    "active" CHAR(1),
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0)
);

-- Source: [dbo].[Branches_convert_details]
CREATE TABLE IF NOT EXISTS "mdf_branches_convert_details" (
    "from_branch_id" NUMERIC(18,0) NOT NULL,
    "branch_convert_id" NUMERIC(18,0) NOT NULL,
    "details_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0),
    "counter_id" NUMERIC(18,0),
    "amount" NUMERIC(18,3),
    "exp_date" TIMESTAMP,
    "unit_id" NUMERIC(18,0),
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "vendor_id" NUMERIC(18,0),
    "tax_price" NUMERIC(19,4),
    "is_open" CHAR(1),
    "unit_change" DOUBLE PRECISION
);

-- Source: [dbo].[Branches_convert_header]
CREATE TABLE IF NOT EXISTS "mdf_branches_convert_header" (
    "branch_convert_id" NUMERIC(18,0) NOT NULL,
    "from_branch_id" NUMERIC(18,0) NOT NULL,
    "to_branch_id" NUMERIC(18,0),
    "from_store_id" NUMERIC(18,0) NOT NULL,
    "to_store_id" NUMERIC(18,0),
    "total_sell_price" NUMERIC(19,4),
    "total_buy_price" NUMERIC(19,4),
    "product_number" INTEGER,
    "notes" VARCHAR(100),
    "is_open" CHAR(1),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Branches_customer]
CREATE TABLE IF NOT EXISTS "mdf_branches_customer" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "customer_id" NUMERIC(18,0) NOT NULL,
    "customer_code" VARCHAR(25),
    "customer_name_ar" VARCHAR(50),
    "customer_name_en" VARCHAR(50),
    "job_id" VARCHAR(50),
    "mobile" VARCHAR(20),
    "tel" VARCHAR(20),
    "address" VARCHAR(250),
    "customer_class_id" NUMERIC(18,0),
    "customer_major" NUMERIC(18,0),
    "active" CHAR(1),
    "start_work_date" TIMESTAMP,
    "customer_max_money" NUMERIC(19,4),
    "customer_current_money" NUMERIC(19,4),
    "customer_rate_pay" DOUBLE PRECISION,
    "customer_house_no" VARCHAR(25),
    "customer_pay_type" INTEGER,
    "customer_start_money" NUMERIC(19,4),
    "deleted" CHAR(1),
    "contract_id" NUMERIC(18,0),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "area_id" NUMERIC(18,0),
    "sales_man" NUMERIC(18,0),
    "sale_class_id" NUMERIC(18,0),
    "sell_price_buy" CHAR(1),
    "customer_disc_local" DOUBLE PRECISION,
    "customer_disc_import" DOUBLE PRECISION,
    "customer_insurance_code" VARCHAR(100)
);

-- Source: [dbo].[Branches_description_edit]
CREATE TABLE IF NOT EXISTS "mdf_branches_description_edit" (
    "pd_edit_id" NUMERIC(18,0) NOT NULL,
    "insert_type" CHAR(1),
    "pd_id" NUMERIC(18,0),
    "pd_code" VARCHAR(20),
    "pd_name_ar" VARCHAR(50),
    "pd_name_en" VARCHAR(50),
    "deleted" CHAR(1),
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0)
);

-- Source: [dbo].[Branches_employee_edit]
CREATE TABLE IF NOT EXISTS "mdf_branches_employee_edit" (
    "emp_edit_id" NUMERIC(18,0) NOT NULL,
    "insert_type" CHAR(1),
    "emp_id" NUMERIC(18,0) NOT NULL,
    "emp_code" VARCHAR(20),
    "emp_name_ar" VARCHAR(50),
    "emp_name_en" VARCHAR(50),
    "emp_gender" VARCHAR(20),
    "job_id" NUMERIC(18,0),
    "birth_date" TIMESTAMP,
    "hire_date" TIMESTAMP,
    "work_date" TIMESTAMP,
    "mobile" VARCHAR(20),
    "home_tel" VARCHAR(20),
    "address" VARCHAR(100),
    "card_id" VARCHAR(50),
    "card_date" TIMESTAMP,
    "card_place" VARCHAR(50),
    "active" CHAR(1),
    "max_disc_per" NUMERIC(19,4),
    "max_disc_money" NUMERIC(19,4),
    "show_buy" CHAR(1),
    "show_cash_disk_history" CHAR(1),
    "show_total_sales_report" CHAR(1),
    "use_compu" CHAR(1),
    "username" VARCHAR(20),
    "pass" VARCHAR(20),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "deleted" CHAR(1),
    "salary_typ" VARCHAR(20),
    "basic_salary" NUMERIC(19,4),
    "more_salary" NUMERIC(19,4),
    "emp_cust_max_money" CHAR(1),
    "emp_add_product" CHAR(1),
    "emp_edit_product" CHAR(1),
    "emp_r_sale_date" CHAR(1),
    "emp_r_sale_bill_num" INTEGER,
    "emp_add_cust" CHAR(1),
    "emp_edit_cust" CHAR(1),
    "emp_del_cust" CHAR(1),
    "emp_commission1" DOUBLE PRECISION,
    "emp_commission2" DOUBLE PRECISION,
    "emp_edit_sell_price" CHAR(1),
    "absence_money" NUMERIC(19,4),
    "allaw_r_sale" CHAR(1),
    "numof_customer" INTEGER,
    "emp_show_money" CHAR(1),
    "emp_change_cash_disk" CHAR(1),
    "allaw_sale_credit" CHAR(1),
    "allaw_un_sale" CHAR(1),
    "allaw_sale_delivery" CHAR(1),
    "cash_advance" NUMERIC(19,4),
    "allaw_save_cash_credit" CHAR(1)
);

-- Source: [dbo].[Branches_group_edit]
CREATE TABLE IF NOT EXISTS "mdf_branches_group_edit" (
    "group_edit_id" NUMERIC(18,0) NOT NULL,
    "insert_type" CHAR(1),
    "group_id" NUMERIC(18,0),
    "group_code" VARCHAR(20),
    "group_name_ar" VARCHAR(50),
    "group_name_en" VARCHAR(50),
    "deleted" CHAR(1),
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0)
);

-- Source: [dbo].[Branches_mail]
CREATE TABLE IF NOT EXISTS "mdf_branches_mail" (
    "mail_id" NUMERIC(18,0) NOT NULL,
    "mail_address" VARCHAR(100),
    "mail_notes" TEXT,
    "is_read" CHAR(1),
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "from_branch" NUMERIC(18,0),
    "to_branch" NUMERIC(18,0) NOT NULL
);

-- Source: [dbo].[Branches_Product_Amount]
CREATE TABLE IF NOT EXISTS "mdf_branches_product_amount" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "vendor_id" NUMERIC(18,0),
    "amount" NUMERIC(18,3),
    "buy_price" NUMERIC(19,4),
    "sell_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "exp_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "pa_id" NUMERIC(18,0) NOT NULL,
    "branch_pa_id" NUMERIC(18,0) NOT NULL
);

-- Source: [dbo].[Branches_Product_amount_Change]
CREATE TABLE IF NOT EXISTS "mdf_branches_product_amount_change" (
    "ch_id" NUMERIC(18,0) NOT NULL,
    "branch_id" NUMERIC(18,0) NOT NULL,
    "id" NUMERIC(18,0) NOT NULL,
    "in_type" CHAR(1),
    "counter_id" NUMERIC(18,0),
    "product_id" NUMERIC(18,0),
    "store_id" NUMERIC(18,0),
    "amount" NUMERIC(18,3),
    "exp_date" TIMESTAMP,
    "form_type" INTEGER,
    "form_notice" VARCHAR(150),
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "vendor_id" NUMERIC(18,0),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "stock" NUMERIC(18,3)
);

-- Source: [dbo].[Branches_products_edit]
CREATE TABLE IF NOT EXISTS "mdf_branches_products_edit" (
    "product_edit_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "insert_type" CHAR(1),
    "product_code" VARCHAR(20),
    "product_fast_code" VARCHAR(20),
    "product_int_code" VARCHAR(20),
    "product_name_ar" VARCHAR(100),
    "product_name_en" VARCHAR(100),
    "product_scientific_name" VARCHAR(200),
    "product_drug" CHAR(1),
    "company_id" NUMERIC(18,0),
    "product_has_expire" CHAR(1),
    "site_id" NUMERIC(18,0),
    "product_buy_number" NUMERIC(18,0),
    "product_big_number" NUMERIC(18,0),
    "product_small_number" NUMERIC(18,0),
    "sell_price" NUMERIC(19,4),
    "product_disc1" NUMERIC(10,0),
    "product_disc2" NUMERIC(18,0),
    "tax_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "deleted" CHAR(1),
    "active" CHAR(1),
    "product_unit1" NUMERIC(18,0),
    "product_unit2" NUMERIC(18,0),
    "product_unit3" NUMERIC(18,0),
    "product_unit1_2" NUMERIC(18,0),
    "product_unit1_3" NUMERIC(18,0),
    "product_sale_unit" NUMERIC(18,0),
    "group_id" NUMERIC(18,0),
    "pd_id" NUMERIC(18,0),
    "product_print_barcode" INTEGER NOT NULL,
    "product_allow_disc" INTEGER,
    "product_max_disc" DOUBLE PRECISION,
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0),
    "up_date" TIMESTAMP,
    "up_uid" NUMERIC(18,0),
    "notes" VARCHAR(300),
    "product_minus" CHAR(1),
    "product_made" CHAR(1),
    "product_int_code1" VARCHAR(50),
    "product_int_code2" VARCHAR(50),
    "product_int_code3" VARCHAR(50),
    "product_int_code4" VARCHAR(50),
    "product_unit1_sale" NUMERIC(18,0),
    "unit2_sell_price" NUMERIC(19,4),
    "unit3_sell_price" NUMERIC(19,4),
    "sell_clause" NUMERIC(19,4),
    "unit2_sell_price_clause" NUMERIC(19,4),
    "unit3_sell_price_clause" NUMERIC(19,4),
    "amount_zero" CHAR(1),
    "no_print_name" CHAR(1)
);

-- Source: [dbo].[Branches_purchase_details]
CREATE TABLE IF NOT EXISTS "mdf_branches_purchase_details" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "purchase_id" NUMERIC(18,0) NOT NULL,
    "details_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "exp_date" TIMESTAMP,
    "amount" DOUBLE PRECISION,
    "bouns" DOUBLE PRECISION,
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "gain_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "back" CHAR(1),
    "back_amount" DOUBLE PRECISION,
    "back_price" NUMERIC(19,4),
    "back_bouns" DOUBLE PRECISION,
    "back_tax_price" NUMERIC(19,4),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "co_tax_price" NUMERIC(19,4)
);

-- Source: [dbo].[Branches_purchase_header]
CREATE TABLE IF NOT EXISTS "mdf_branches_purchase_header" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "purchase_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "vendor_id" NUMERIC(18,0),
    "order_id" NUMERIC(18,0),
    "class" VARCHAR(2),
    "product_number" INTEGER,
    "total_bill" NUMERIC(19,4),
    "bill_disc_per" DOUBLE PRECISION,
    "bill_disc_money" NUMERIC(19,4),
    "bill_other_expenses" NUMERIC(19,4),
    "cashier_id" NUMERIC(18,0),
    "bill_number" VARCHAR(100),
    "bill_date" TIMESTAMP,
    "back" CHAR(1),
    "total_back" NUMERIC(19,4),
    "total_after_back" NUMERIC(19,4),
    "notes" TEXT,
    "gf_id" NUMERIC(18,0),
    "back_number" VARCHAR(20),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "sell_back" CHAR(1),
    "man_back_details" VARCHAR(50),
    "customer_id" NUMERIC(18,0),
    "bill_tax" NUMERIC(19,4)
);

-- Source: [dbo].[Branches_sales_details]
CREATE TABLE IF NOT EXISTS "mdf_branches_sales_details" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "sales_id" NUMERIC(18,0) NOT NULL,
    "details_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "exp_date" TIMESTAMP,
    "amount" NUMERIC(18,3),
    "sale_unit_change" NUMERIC(18,0),
    "sale_unit" INTEGER,
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "disc_money" NUMERIC(19,4),
    "disc_per" NUMERIC(18,0),
    "total_sell" NUMERIC(19,4),
    "back" CHAR(1),
    "back_amount" DOUBLE PRECISION,
    "back_unit_change" NUMERIC(18,0),
    "back_price" NUMERIC(19,4),
    "back_unit" INTEGER,
    "back_gf_id" NUMERIC(18,0),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "sales_details_id" NUMERIC(18,0)
);

-- Source: [dbo].[Branches_sales_header]
CREATE TABLE IF NOT EXISTS "mdf_branches_sales_header" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "sales_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "customer_id" NUMERIC(18,0),
    "class" INTEGER,
    "product_number" INTEGER,
    "bill_money_befor" NUMERIC(19,4),
    "total_bill" NUMERIC(19,4),
    "total_after_disc" NUMERIC(19,4),
    "total_bill_net" NUMERIC(19,4),
    "total_disc_per" NUMERIC(18,0),
    "total_disc_money" NUMERIC(19,4),
    "total_product_disc" NUMERIC(19,4),
    "customer_disc_per" NUMERIC(18,0),
    "bill_cash" NUMERIC(19,4),
    "cashier_id" NUMERIC(18,0),
    "notes" VARCHAR(200),
    "bill_other_expenses" NUMERIC(19,4),
    "gf_id" NUMERIC(18,0),
    "contract_id" NUMERIC(18,0),
    "major_customer_part" NUMERIC(19,4),
    "bill_number" VARCHAR(50),
    "back" CHAR(1),
    "bill_date" TIMESTAMP,
    "compu_name" VARCHAR(150),
    "cashier_disk_id" NUMERIC(18,0),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "cust_name" VARCHAR(75),
    "sale_class" INTEGER,
    "money_change" NUMERIC(19,4),
    "network_money" NUMERIC(19,4),
    "network_id" NUMERIC(18,0),
    "delivery_man_id" NUMERIC(8,0),
    "ticket_name" VARCHAR(100),
    "ticket_id" VARCHAR(50),
    "ticket_num" VARCHAR(50)
);

-- Source: [dbo].[Branches_shortcoming]
CREATE TABLE IF NOT EXISTS "mdf_branches_shortcoming" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "id" NUMERIC(18,0) NOT NULL,
    "class" CHAR(1),
    "general" CHAR(1),
    "notes" VARCHAR(50),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "vendor_id" NUMERIC(18,0),
    "amount" DOUBLE PRECISION
);

-- Source: [dbo].[Branches_stores]
CREATE TABLE IF NOT EXISTS "mdf_branches_stores" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0) NOT NULL,
    "store_code" VARCHAR(20),
    "store_name_ar" VARCHAR(50),
    "store_name_en" VARCHAR(50),
    "active" CHAR(1),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Branches_unit_edit]
CREATE TABLE IF NOT EXISTS "mdf_branches_unit_edit" (
    "unit_edit_id" NUMERIC(18,0) NOT NULL,
    "insert_type" CHAR(1),
    "unit_id" NUMERIC(18,0),
    "unit_code" VARCHAR(20),
    "unit_name_ar" VARCHAR(50),
    "unit_name_en" VARCHAR(50),
    "deleted" CHAR(1),
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0)
);

-- Source: [dbo].[Branches_Vendor]
CREATE TABLE IF NOT EXISTS "mdf_branches_vendor" (
    "branch_id" NUMERIC(18,0) NOT NULL,
    "vendor_id" NUMERIC(18,0) NOT NULL,
    "vendor_code" VARCHAR(20),
    "vendor_name_ar" VARCHAR(50),
    "vendor_name_en" VARCHAR(50),
    "tel" VARCHAR(20),
    "mobile" VARCHAR(20),
    "address" VARCHAR(100),
    "company_code" VARCHAR(20),
    "vendor_max_money" NUMERIC(19,4),
    "vendor_current_money" NUMERIC(19,4),
    "deleted" CHAR(1),
    "active" CHAR(1),
    "vendor_start_money" NUMERIC(19,4),
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0),
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "emp_tel" VARCHAR(100),
    "emp_tel_details" VARCHAR(100),
    "emp_area_manegar" VARCHAR(100),
    "emp_area_manegar_details" VARCHAR(100),
    "emp_deliv" VARCHAR(100),
    "emp_deliv_details" VARCHAR(100),
    "emp_get_money" VARCHAR(100),
    "emp_get_money_details" VARCHAR(100),
    "ven_notes" VARCHAR(100),
    "ven_return" VARCHAR(100)
);

-- Source: [dbo].[Cash_depots]
CREATE TABLE IF NOT EXISTS "mdf_cash_depots" (
    "cash_depot_id" NUMERIC(18,0) NOT NULL,
    "cash_depot_code" VARCHAR(10),
    "cash_depot_name_ar" VARCHAR(50),
    "cash_depot_name_en" VARCHAR(50),
    "cash_depot_class" CHAR(1),
    "cash_depot_current_money" NUMERIC(19,4),
    "account_number" VARCHAR(50),
    "bank_id" NUMERIC(18,0),
    "insert_uid" VARCHAR(10),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(10),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Cash_disk_close]
CREATE TABLE IF NOT EXISTS "mdf_cash_disk_close" (
    "cdc_id" NUMERIC(18,0) NOT NULL,
    "cdc_cash_id" NUMERIC(18,0),
    "cdc_emp_id" NUMERIC(18,0),
    "cdc_shift_start_time" TIMESTAMP,
    "cdc_start_cash" NUMERIC(19,4),
    "cdc_curr_cash" NUMERIC(19,4),
    "cdc_act_cash" NUMERIC(19,4),
    "cdc_to_emp_id" NUMERIC(18,0),
    "cdc_fcs_id" NUMERIC(18,0),
    "cdc_trans_value" NUMERIC(19,4),
    "cdc_notice" VARCHAR(100),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "last_gf_id" NUMERIC(18,0)
);

-- Source: [dbo].[Checks]
CREATE TABLE IF NOT EXISTS "mdf_checks" (
    "ch_id" NUMERIC(18,0) NOT NULL,
    "gf_id" NUMERIC(18,0),
    "flag" INTEGER,
    "out_in" CHAR(1),
    "ch_number" VARCHAR(50),
    "ch_date_created" TIMESTAMP,
    "ch_valid_date" TIMESTAMP,
    "ch_status" CHAR(1),
    "ch_status_change_date" TIMESTAMP,
    "ch_expenses" NUMERIC(19,4),
    "name" VARCHAR(50),
    "cashed" CHAR(1),
    "gf_id_cash" NUMERIC(18,0),
    "insert_uid" VARCHAR(10),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(10),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Co_bank]
CREATE TABLE IF NOT EXISTS "mdf_co_bank" (
    "bank_id" NUMERIC(18,0) NOT NULL,
    "bank_code" VARCHAR(10),
    "bank_name_ar" VARCHAR(50),
    "bank_name_en" VARCHAR(50),
    "bank_address" VARCHAR(50),
    "bank_tel" VARCHAR(50),
    "insert_uid" VARCHAR(10),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(9),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[co_inf]
CREATE TABLE IF NOT EXISTS "mdf_co_inf" (
    "id" NUMERIC(10,0) NOT NULL,
    "com_name_ar" VARCHAR(50),
    "com_name_en" VARCHAR(50),
    "idl" VARCHAR(50),
    "ide" VARCHAR(50),
    "owner" VARCHAR(50),
    "manegar" VARCHAR(50),
    "tel" VARCHAR(20),
    "fax" VARCHAR(20),
    "address" VARCHAR(100),
    "up_date" TIMESTAMP,
    "uid" VARCHAR(9),
    "s_print_type" CHAR(1),
    "s_intro" VARCHAR(100),
    "s_co_name" VARCHAR(50),
    "s_co_tel" VARCHAR(50),
    "s_finish" VARCHAR(100),
    "s_idl" VARCHAR(50),
    "s_ide" VARCHAR(50),
    "s_cust" CHAR(1),
    "s_emp" CHAR(1),
    "mini_money" NUMERIC(19,4),
    "num_of_copy" INTEGER,
    "bar_name" VARCHAR(50),
    "bar_tel" VARCHAR(50),
    "p_bar_name" CHAR(1),
    "p_bar_tel" CHAR(1),
    "bar_type" CHAR(1),
    "bar_size" CHAR(1),
    "syndicate_id" NUMERIC(18,0),
    "branch_id" INTEGER,
    "master_branch_id" INTEGER,
    "logo" BYTEA,
    "main_eg1" BYTEA,
    "main_eg2" BYTEA,
    "online_product_id" NUMERIC(18,0),
    "product_price_update_id" NUMERIC(18,0),
    "product_update_id" NUMERIC(18,0),
    "no_decimal" CHAR(1),
    "no_exp" CHAR(1),
    "auto_unsaved" CHAR(1),
    "trans_id" NUMERIC(18,0)
);

-- Source: [dbo].[company_Owner]
CREATE TABLE IF NOT EXISTS "mdf_company_owner" (
    "coow_id" NUMERIC(18,0) NOT NULL,
    "coow_code" VARCHAR(20),
    "coow_name_ar" VARCHAR(50),
    "coow_name_en" VARCHAR(50),
    "tel" VARCHAR(20),
    "mobile" VARCHAR(20),
    "address" VARCHAR(100),
    "coow_current_money" NUMERIC(19,4),
    "deleted" CHAR(1),
    "active" CHAR(1),
    "coow_start_money" NUMERIC(19,4),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(9),
    "update_uid" VARCHAR(20),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Companys]
CREATE TABLE IF NOT EXISTS "mdf_companys" (
    "company_id" NUMERIC(18,0) NOT NULL,
    "company_code" VARCHAR(10),
    "co_name_ar" VARCHAR(50),
    "co_name_en" VARCHAR(50),
    "mobile" VARCHAR(20),
    "tel" VARCHAR(20),
    "address" VARCHAR(100),
    "deleted" CHAR(1),
    "active" CHAR(1),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(9)
);

-- Source: [dbo].[Customer]
CREATE TABLE IF NOT EXISTS "mdf_customer" (
    "customer_id" NUMERIC(18,0) NOT NULL,
    "customer_code" VARCHAR(25),
    "customer_name_ar" VARCHAR(50),
    "customer_name_en" VARCHAR(50),
    "job_id" VARCHAR(50),
    "mobile" VARCHAR(20),
    "tel" VARCHAR(20),
    "address" VARCHAR(250),
    "customer_class_id" NUMERIC(18,0),
    "customer_major" NUMERIC(18,0),
    "active" CHAR(1),
    "start_work_date" TIMESTAMP,
    "customer_max_money" NUMERIC(19,4),
    "customer_current_money" NUMERIC(19,4),
    "customer_rate_pay" DOUBLE PRECISION,
    "customer_house_no" VARCHAR(50),
    "customer_pay_type" INTEGER,
    "customer_start_money" NUMERIC(19,4),
    "deleted" CHAR(1),
    "contract_id" NUMERIC(18,0),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(20),
    "update_date" TIMESTAMP,
    "area_id" NUMERIC(18,0),
    "sales_man" NUMERIC(18,0),
    "sale_class_id" NUMERIC(18,0),
    "sell_price_buy" CHAR(1),
    "customer_disc_local" DOUBLE PRECISION,
    "customer_disc_import" DOUBLE PRECISION,
    "customer_insurance_code" VARCHAR(100)
);

-- Source: [dbo].[Customer_Area]
CREATE TABLE IF NOT EXISTS "mdf_customer_area" (
    "area_id" NUMERIC(18,0) NOT NULL,
    "area_code" VARCHAR(20),
    "area_name_ar" VARCHAR(100),
    "area_name_en" VARCHAR(100),
    "deleted" CHAR(1),
    "insert_uid" VARCHAR(50),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(50),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Customer_Class]
CREATE TABLE IF NOT EXISTS "mdf_customer_class" (
    "customer_class_id" NUMERIC(18,0) NOT NULL,
    "class_name_ar" VARCHAR(50),
    "class_name_en" VARCHAR(50),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(20)
);

-- Source: [dbo].[customer_contracts]
CREATE TABLE IF NOT EXISTS "mdf_customer_contracts" (
    "contract_id" NUMERIC(18,0) NOT NULL,
    "customer_id" NUMERIC(18,0),
    "contract_code" VARCHAR(50),
    "contract_name" VARCHAR(50),
    "max_bill_money" NUMERIC(19,4),
    "bill_disc" NUMERIC(18,2),
    "customer_pay_rate" NUMERIC(18,2),
    "customer_pay_value" NUMERIC(19,4),
    "bill_disc_rule" INTEGER,
    "company_pay_rule" INTEGER,
    "active" CHAR(1),
    "product_disc" CHAR(1),
    "local_product_disc" NUMERIC(18,2),
    "imported_product_disc" NUMERIC(18,2),
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0)
);

-- Source: [dbo].[DB_online_update_Error]
CREATE TABLE IF NOT EXISTS "mdf_db_online_update_error" (
    "error_id" NUMERIC(18,0) NOT NULL,
    "trans_id" NUMERIC(18,0) NOT NULL,
    "table_id" INTEGER,
    "trans_type" CHAR(1),
    "trans" TEXT,
    "ex" TEXT,
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[dtproperties]
CREATE TABLE IF NOT EXISTS "mdf_dtproperties" (
    "id" INTEGER NOT NULL,
    "objectid" INTEGER,
    "property" VARCHAR(64) NOT NULL,
    "value" VARCHAR(255),
    "uvalue" VARCHAR(255),
    "lvalue" BYTEA,
    "version" INTEGER NOT NULL
);

-- Source: [dbo].[EMP_CONTROL]
CREATE TABLE IF NOT EXISTS "mdf_emp_control" (
    "emp_id" NUMERIC(18,0) NOT NULL,
    "a" CHAR(1),
    "a1" CHAR(1),
    "a2" CHAR(1),
    "a3" CHAR(1),
    "a4" CHAR(1),
    "a5" CHAR(1),
    "a6" CHAR(1),
    "a7" CHAR(1),
    "a8" CHAR(1),
    "a9" CHAR(1),
    "b" CHAR(1),
    "b1" CHAR(1),
    "b2" CHAR(1),
    "b3" CHAR(1),
    "b4" CHAR(1),
    "b5" CHAR(1),
    "b6" CHAR(1),
    "b7" CHAR(1),
    "b8" CHAR(1),
    "b9" CHAR(1),
    "b10" CHAR(1),
    "b11" CHAR(1),
    "b12" CHAR(1),
    "b13" CHAR(1),
    "b14" CHAR(1),
    "b15" CHAR(1),
    "b16" CHAR(1),
    "b17" CHAR(1),
    "b18" CHAR(1),
    "b19" CHAR(1),
    "b20" CHAR(1),
    "b21" CHAR(1),
    "b22" CHAR(1),
    "b23" CHAR(1),
    "b24" CHAR(1),
    "b25" CHAR(1),
    "b26" CHAR(1),
    "b27" CHAR(1),
    "b28" CHAR(1),
    "c" CHAR(1),
    "c1" CHAR(1),
    "c2" CHAR(1),
    "c3" CHAR(1),
    "c4" CHAR(1),
    "c5" CHAR(1),
    "c6" CHAR(1),
    "c7" CHAR(1),
    "d" CHAR(1),
    "d1" CHAR(1),
    "d2" CHAR(1),
    "d3" CHAR(1),
    "d4" CHAR(1),
    "d5" CHAR(1),
    "d6" CHAR(1),
    "d7" CHAR(1),
    "d8" CHAR(1),
    "d9" CHAR(1),
    "e" CHAR(1),
    "e1" CHAR(1),
    "e2" CHAR(1),
    "e3" CHAR(1),
    "e4" CHAR(1),
    "e5" CHAR(1),
    "f" CHAR(1),
    "f1" CHAR(1),
    "f2" CHAR(1),
    "f3" CHAR(1),
    "f4" CHAR(1),
    "f5" CHAR(1),
    "f6" CHAR(1),
    "f7" CHAR(1),
    "f8" CHAR(1),
    "f9" CHAR(1),
    "f10" CHAR(1),
    "f11" CHAR(1),
    "f12" CHAR(1),
    "f13" CHAR(1),
    "f14" CHAR(1),
    "f15" CHAR(1),
    "f16" CHAR(1),
    "f17" CHAR(1),
    "g" CHAR(1),
    "ga" CHAR(1),
    "ga1" CHAR(1),
    "ga2" CHAR(1),
    "ga3" CHAR(1),
    "ga4" CHAR(1),
    "ga5" CHAR(1),
    "ga6" CHAR(1),
    "g1" CHAR(1),
    "g2" CHAR(1),
    "g3" CHAR(1),
    "g4" CHAR(1),
    "g5" CHAR(1),
    "g6" CHAR(1),
    "g7" CHAR(1),
    "g8" CHAR(1),
    "g9" CHAR(1),
    "g10" CHAR(1),
    "g11" CHAR(1),
    "g12" CHAR(1),
    "g13" CHAR(1),
    "g14" CHAR(1),
    "g15" CHAR(1),
    "g16" CHAR(1),
    "g17" CHAR(1),
    "g18" CHAR(1),
    "g19" CHAR(1),
    "g20" CHAR(1),
    "h" CHAR(1),
    "h1" CHAR(1),
    "h2" CHAR(1),
    "i" CHAR(1),
    "i1" CHAR(1),
    "i2" CHAR(1),
    "i3" CHAR(1),
    "i4" CHAR(1),
    "i5" CHAR(1),
    "i6" CHAR(1),
    "g21" CHAR(1),
    "g22" CHAR(1),
    "f18" CHAR(1),
    "e6" CHAR(1),
    "e7" CHAR(1),
    "f19" CHAR(1),
    "f20" CHAR(1),
    "f21" CHAR(1),
    "i7" CHAR(1),
    "i8" CHAR(1),
    "i9" CHAR(1),
    "i10" CHAR(1),
    "i11" CHAR(1),
    "i12" CHAR(1),
    "i13" CHAR(1),
    "i14" CHAR(1),
    "i15" CHAR(1),
    "i16" CHAR(1),
    "i17" CHAR(1),
    "i18" CHAR(1),
    "b29" CHAR(1),
    "g23" CHAR(1),
    "d10" CHAR(1),
    "g24" CHAR(1),
    "a10" CHAR(1),
    "b0" CHAR(1),
    "f22" CHAR(1),
    "f23" CHAR(1),
    "e8" CHAR(1),
    "b30" CHAR(1),
    "b31" CHAR(1),
    "j" CHAR(1),
    "j1" CHAR(1),
    "j2" CHAR(1),
    "j3" CHAR(1),
    "j4" CHAR(1),
    "j5" CHAR(1),
    "j6" CHAR(1),
    "j7" CHAR(1),
    "j8" CHAR(1),
    "j9" CHAR(1),
    "j10" CHAR(1),
    "j11" CHAR(1),
    "j12" CHAR(1),
    "j13" CHAR(1),
    "j14" CHAR(1),
    "j15" CHAR(1),
    "j16" CHAR(1),
    "j17" CHAR(1),
    "j18" CHAR(1),
    "f24" CHAR(1),
    "j19" CHAR(1),
    "j20" CHAR(1),
    "j21" CHAR(1),
    "j22" CHAR(1),
    "j23" CHAR(1),
    "j24" CHAR(1),
    "b32" CHAR(1),
    "g25" CHAR(1),
    "b33" CHAR(1),
    "f25" CHAR(1),
    "g26" CHAR(1),
    "g27" CHAR(1),
    "g28" CHAR(1),
    "g29" CHAR(1),
    "g30" CHAR(1),
    "d11" CHAR(1),
    "f26" CHAR(10),
    "f27" CHAR(10),
    "i19" CHAR(1),
    "i20" CHAR(1),
    "i21" CHAR(1),
    "b34" CHAR(1),
    "f28" CHAR(1),
    "b35" CHAR(1),
    "j25" CHAR(1)
);

-- Source: [dbo].[Employee]
CREATE TABLE IF NOT EXISTS "mdf_employee" (
    "emp_id" NUMERIC(18,0) NOT NULL,
    "emp_code" VARCHAR(20),
    "emp_name_ar" VARCHAR(50),
    "emp_name_en" VARCHAR(50),
    "emp_gender" VARCHAR(20),
    "job_id" NUMERIC(18,0),
    "birth_date" TIMESTAMP,
    "hire_date" TIMESTAMP,
    "work_date" TIMESTAMP,
    "mobile" VARCHAR(20),
    "home_tel" VARCHAR(20),
    "address" VARCHAR(100),
    "card_id" VARCHAR(50),
    "card_date" TIMESTAMP,
    "card_place" VARCHAR(50),
    "active" CHAR(1),
    "max_disc_per" NUMERIC(19,4),
    "max_disc_money" NUMERIC(19,4),
    "show_buy" CHAR(1),
    "show_cash_disk_history" CHAR(1),
    "show_total_sales_report" CHAR(1),
    "use_compu" CHAR(1),
    "username" VARCHAR(50),
    "pass" VARCHAR(50),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(20),
    "update_uid" VARCHAR(20),
    "update_date" TIMESTAMP,
    "deleted" CHAR(1),
    "salary_typ" VARCHAR(20),
    "basic_salary" NUMERIC(19,4),
    "more_salary" NUMERIC(19,4),
    "emp_cust_max_money" CHAR(1),
    "emp_add_product" CHAR(1),
    "emp_edit_product" CHAR(1),
    "emp_r_sale_date" CHAR(1),
    "emp_r_sale_bill_num" INTEGER,
    "emp_add_cust" CHAR(1),
    "emp_edit_cust" CHAR(1),
    "emp_del_cust" CHAR(1),
    "emp_commission1" DOUBLE PRECISION,
    "emp_commission2" DOUBLE PRECISION,
    "emp_edit_sell_price" CHAR(1),
    "absence_money" NUMERIC(19,4),
    "allaw_r_sale" CHAR(1),
    "numof_customer" INTEGER,
    "emp_show_money" CHAR(1),
    "emp_change_cash_disk" CHAR(1),
    "allaw_sale_credit" CHAR(1),
    "allaw_un_sale" CHAR(1),
    "allaw_sale_delivery" CHAR(1),
    "cash_advance" NUMERIC(19,4),
    "allaw_save_cash_credit" CHAR(1)
);

-- Source: [dbo].[Employee_absence_money]
CREATE TABLE IF NOT EXISTS "mdf_employee_absence_money" (
    "emp_id" NUMERIC(18,0) NOT NULL,
    "emp_absence_money" NUMERIC(19,4),
    "month_salary" TIMESTAMP,
    "notes" VARCHAR(100),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Employee_cash_advance]
CREATE TABLE IF NOT EXISTS "mdf_employee_cash_advance" (
    "cash_advance_id" NUMERIC(18,0) NOT NULL,
    "emp_id" NUMERIC(18,0) NOT NULL,
    "cash_advance" NUMERIC(19,4),
    "notes" VARCHAR(100),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "type" CHAR(1)
);

-- Source: [dbo].[Employee_commission]
CREATE TABLE IF NOT EXISTS "mdf_employee_commission" (
    "emp_id" NUMERIC(18,0) NOT NULL,
    "emp_commission" NUMERIC(19,4),
    "month_salary" TIMESTAMP,
    "notes" VARCHAR(100),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(20)
);

-- Source: [dbo].[Employee_custody_money]
CREATE TABLE IF NOT EXISTS "mdf_employee_custody_money" (
    "custody_money_id" NUMERIC(18,0) NOT NULL,
    "type" CHAR(1),
    "emp_id" NUMERIC(18,0) NOT NULL,
    "custody_money" NUMERIC(19,4),
    "notes" VARCHAR(100),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Employee_daily_time]
CREATE TABLE IF NOT EXISTS "mdf_employee_daily_time" (
    "emp_code" NUMERIC(18,0) NOT NULL,
    "start_end" CHAR(1),
    "saturday" VARCHAR(50),
    "sunday" VARCHAR(50),
    "monday" VARCHAR(50),
    "tuesday" VARCHAR(50),
    "wednesday" VARCHAR(50),
    "thursday" VARCHAR(50),
    "friday" VARCHAR(50),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "update_date" TIMESTAMP,
    "update_uid" VARCHAR(20)
);

-- Source: [dbo].[Employee_deduction]
CREATE TABLE IF NOT EXISTS "mdf_employee_deduction" (
    "emp_id" NUMERIC(18,0) NOT NULL,
    "emp_deduction" NUMERIC(19,4),
    "month_salary" TIMESTAMP,
    "notes" VARCHAR(100),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(20)
);

-- Source: [dbo].[Employee_over_commission]
CREATE TABLE IF NOT EXISTS "mdf_employee_over_commission" (
    "emp_id" NUMERIC(18,0) NOT NULL,
    "emp_over_commission" NUMERIC(19,4),
    "month_salary" TIMESTAMP,
    "notes" VARCHAR(100),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Employee_perks]
CREATE TABLE IF NOT EXISTS "mdf_employee_perks" (
    "emp_id" NUMERIC(18,0) NOT NULL,
    "emp_perks" NUMERIC(19,4),
    "month_salary" TIMESTAMP,
    "notes" VARCHAR(100),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "perks_id" NUMERIC(18,0) NOT NULL
);

-- Source: [dbo].[Employee_salary]
CREATE TABLE IF NOT EXISTS "mdf_employee_salary" (
    "salary_id" NUMERIC(18,0) NOT NULL,
    "emp_id" NUMERIC(18,0) NOT NULL,
    "state" CHAR(1),
    "basic_salary" NUMERIC(19,4),
    "emp_commission" NUMERIC(19,4),
    "emp_over_commission" NUMERIC(19,4),
    "emp_deduction" NUMERIC(19,4),
    "emp_absence_money" NUMERIC(19,4),
    "total" NUMERIC(19,4),
    "month_salary" TIMESTAMP,
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "cash_advance" NUMERIC(19,4)
);

-- Source: [dbo].[Employee_work_time]
CREATE TABLE IF NOT EXISTS "mdf_employee_work_time" (
    "id" NUMERIC(18,0) NOT NULL,
    "employee_id" NUMERIC(18,0),
    "day_start" TIMESTAMP,
    "daily_start" TIMESTAMP,
    "day_end" TIMESTAMP,
    "daily_end" TIMESTAMP,
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(20),
    "update_date" TIMESTAMP,
    "update_uid" VARCHAR(20),
    "day_class" CHAR(1)
);

-- Source: [dbo].[Flag]
CREATE TABLE IF NOT EXISTS "mdf_flag" (
    "f_id" NUMERIC(18,0) NOT NULL,
    "f_code" VARCHAR(20),
    "f_name" VARCHAR(50)
);

-- Source: [dbo].[Gedo_branches]
CREATE TABLE IF NOT EXISTS "mdf_gedo_branches" (
    "gb_id" NUMERIC(18,0) NOT NULL,
    "gf_id" VARCHAR(20),
    "flag" INTEGER,
    "gb_type" CHAR(1),
    "branch_id" NUMERIC(18,0),
    "gb_for_him" NUMERIC(19,4),
    "gb_for_me" NUMERIC(19,4),
    "total" NUMERIC(19,4),
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0)
);

-- Source: [dbo].[Gedo_customers]
CREATE TABLE IF NOT EXISTS "mdf_gedo_customers" (
    "gc_id" NUMERIC(18,0) NOT NULL,
    "gf_id" VARCHAR(20),
    "flag" INTEGER,
    "gc_type" CHAR(1),
    "customer_id" NUMERIC(18,0),
    "gc_for_him" NUMERIC(19,4),
    "gc_for_me" NUMERIC(19,4),
    "total" NUMERIC(19,4),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(20),
    "notes" VARCHAR(150)
);

-- Source: [dbo].[Gedo_Dividends_paied]
CREATE TABLE IF NOT EXISTS "mdf_gedo_dividends_paied" (
    "dividends_id" NUMERIC(18,0) NOT NULL,
    "coow_id" NUMERIC(18,0),
    "yaer_id" INTEGER,
    "gf_id" NUMERIC(18,0),
    "paied_money" NUMERIC(19,4),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Gedo_employee]
CREATE TABLE IF NOT EXISTS "mdf_gedo_employee" (
    "ge_id" NUMERIC(18,0) NOT NULL,
    "gf_id" VARCHAR(50),
    "flag" INTEGER,
    "ge_type" CHAR(1),
    "emp_id" NUMERIC(18,0),
    "ge_for_him" NUMERIC(19,4),
    "ge_for_me" NUMERIC(19,4),
    "total" NUMERIC(19,4),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Gedo_Financial]
CREATE TABLE IF NOT EXISTS "mdf_gedo_financial" (
    "gf_id" NUMERIC(18,0) NOT NULL,
    "gf_code" VARCHAR(50),
    "gf_gedo_type" INTEGER,
    "gf_value" NUMERIC(19,4),
    "gf_from_type" INTEGER,
    "gf_from_id" NUMERIC(18,0),
    "gf_to_type" INTEGER,
    "gf_to_id" NUMERIC(18,0),
    "gf_notes" VARCHAR(250),
    "gf_computer" VARCHAR(50),
    "gf_actual_cashier" VARCHAR(10),
    "gf_form_type" INTEGER,
    "insert_uid" VARCHAR(10),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(10),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Gedo_Fixed_Assets]
CREATE TABLE IF NOT EXISTS "mdf_gedo_fixed_assets" (
    "gfa_id" NUMERIC(18,0) NOT NULL,
    "gf_id" VARCHAR(20),
    "flag" INTEGER,
    "gfa_type" CHAR(1),
    "account_id" NUMERIC(18,0),
    "gfa_for_him" NUMERIC(19,4),
    "gfa_for_me" NUMERIC(19,4),
    "total" NUMERIC(19,4),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(20)
);

-- Source: [dbo].[Gedo_installment]
CREATE TABLE IF NOT EXISTS "mdf_gedo_installment" (
    "gi_id" NUMERIC(18,0) NOT NULL,
    "f_id" VARCHAR(50),
    "flag" INTEGER,
    "gi_type" CHAR(1),
    "cu_id" NUMERIC(18,0),
    "gi_for_him" NUMERIC(19,4),
    "gi_for_me" NUMERIC(19,4),
    "total" NUMERIC(19,4),
    "insert_uid" VARCHAR(50),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Gedo_Vendors]
CREATE TABLE IF NOT EXISTS "mdf_gedo_vendors" (
    "gv_id" NUMERIC(18,0) NOT NULL,
    "gf_id" VARCHAR(50),
    "flag" INTEGER,
    "gv_type" CHAR(1),
    "vendor_id" NUMERIC(18,0),
    "gv_for_him" NUMERIC(19,4),
    "gv_for_me" NUMERIC(19,4),
    "total" NUMERIC(19,4),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(20),
    "notes" VARCHAR(150)
);

-- Source: [dbo].[installment]
CREATE TABLE IF NOT EXISTS "mdf_installment" (
    "cu_id" NUMERIC(18,0) NOT NULL,
    "cu_name" VARCHAR(100),
    "cu_code" VARCHAR(100),
    "cu_tel" VARCHAR(50),
    "cu_address" VARCHAR(200),
    "cu_man_name" VARCHAR(100),
    "cu_man_code" VARCHAR(100),
    "cu_man_tel" VARCHAR(50),
    "cu_man_address" VARCHAR(200),
    "cu_total" NUMERIC(19,4),
    "cu_start" NUMERIC(19,4),
    "cu_end" NUMERIC(19,4),
    "cu_month_num" INTEGER,
    "cu_month_money" NUMERIC(19,4),
    "cu_sth_id" NUMERIC(18,0),
    "cu_emp" NUMERIC(18,0),
    "cu_current_credit" NUMERIC(19,4),
    "insert_uid" VARCHAR(50),
    "insert_date" TIMESTAMP,
    "notes" VARCHAR(150)
);

-- Source: [dbo].[installment_state]
CREATE TABLE IF NOT EXISTS "mdf_installment_state" (
    "id" NUMERIC(18,0) NOT NULL,
    "details_id" NUMERIC(18,0) NOT NULL,
    "cu_id" NUMERIC(18,0) NOT NULL,
    "state" CHAR(1),
    "pay_month" TIMESTAMP,
    "installment_value" NUMERIC(19,4),
    "insert_uid" VARCHAR(50),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(50),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Jobs]
CREATE TABLE IF NOT EXISTS "mdf_jobs" (
    "job_id" NUMERIC(18,0) NOT NULL,
    "job_code" VARCHAR(50),
    "job_name_ar" VARCHAR(50),
    "job_name_en" VARCHAR(50),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(20),
    "update_date" TIMESTAMP,
    "update_uid" VARCHAR(20)
);

-- Source: [dbo].[News_bar]
CREATE TABLE IF NOT EXISTS "mdf_news_bar" (
    "id" NUMERIC(18,0) NOT NULL,
    "news_id" NUMERIC(18,0),
    "news" VARCHAR(300),
    "insert_date" TIMESTAMP,
    "syndicate_id" NUMERIC(18,0),
    "company_id" CHAR(1),
    "news_insert_date" TIMESTAMP,
    "deleted" CHAR(1),
    "deleted_date" TIMESTAMP
);

-- Source: [dbo].[Order_details]
CREATE TABLE IF NOT EXISTS "mdf_order_details" (
    "details_id" NUMERIC(18,0) NOT NULL,
    "order_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0),
    "amount" DOUBLE PRECISION,
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "product_price" NUMERIC(19,4),
    "product_disc" DOUBLE PRECISION,
    "buy_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "buy_amount" NUMERIC(18,2)
);

-- Source: [dbo].[Order_header]
CREATE TABLE IF NOT EXISTS "mdf_order_header" (
    "order_id" NUMERIC(18,0) NOT NULL,
    "order_class" CHAR(1),
    "vendor_id" NUMERIC(18,0),
    "product_number" INTEGER,
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "buy_money" NUMERIC(19,4),
    "product_money" NUMERIC(19,4)
);

-- Source: [dbo].[Product_Amount]
CREATE TABLE IF NOT EXISTS "mdf_product_amount" (
    "store_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "vendor_id" NUMERIC(18,0),
    "amount" NUMERIC(18,3),
    "buy_price" NUMERIC(19,4),
    "sell_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "exp_date" TIMESTAMP,
    "insert_uid" VARCHAR(10),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(10),
    "update_date" TIMESTAMP,
    "product_update" CHAR(1),
    "product_update_date" TIMESTAMP,
    "pa_id" NUMERIC(18,0) NOT NULL
);

-- Source: [dbo].[Product_amount_Change]
CREATE TABLE IF NOT EXISTS "mdf_product_amount_change" (
    "id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0),
    "product_id" NUMERIC(18,0),
    "store_id" NUMERIC(18,0),
    "old_amount" DOUBLE PRECISION,
    "new_amount" DOUBLE PRECISION,
    "exp_date" TIMESTAMP,
    "form_type" INTEGER,
    "form_notice" VARCHAR(50),
    "insert_uid" VARCHAR(10),
    "insert_date" TIMESTAMP,
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "vendor_id" NUMERIC(18,0),
    "in_type" CHAR(1)
);

-- Source: [dbo].[Product_amount_reg_update]
CREATE TABLE IF NOT EXISTS "mdf_product_amount_reg_update" (
    "id" NUMERIC(18,0) NOT NULL,
    "paru_id" NUMERIC(18,0),
    "product_id" NUMERIC(18,0),
    "store_id" NUMERIC(18,0),
    "counter_id" NUMERIC(18,0),
    "old_amount" DOUBLE PRECISION,
    "new_amount" DOUBLE PRECISION,
    "new_exp_date" TIMESTAMP,
    "old_exp_date" TIMESTAMP,
    "sell_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "store_date" TIMESTAMP,
    "vendor_id" NUMERIC(18,0),
    "product_unit" NUMERIC(18,0),
    "notes" VARCHAR(50),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Product_amount_update]
CREATE TABLE IF NOT EXISTS "mdf_product_amount_update" (
    "id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0),
    "store_id" NUMERIC(18,0),
    "counter_id" NUMERIC(18,0),
    "old_amount" DOUBLE PRECISION,
    "new_amount" DOUBLE PRECISION,
    "new_exp_date" TIMESTAMP,
    "old_exp_date" TIMESTAMP,
    "sell_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "store_date" TIMESTAMP,
    "vendor_id" NUMERIC(18,0),
    "product_unit" NUMERIC(18,0),
    "notes" VARCHAR(50),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Product_Changes]
CREATE TABLE IF NOT EXISTS "mdf_product_changes" (
    "product_change_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0),
    "class" CHAR(1),
    "sell_price_old" NUMERIC(19,4),
    "buy_price_old" NUMERIC(19,4),
    "tax_price_old" NUMERIC(19,4),
    "unit1_2_old" NUMERIC(18,0),
    "unit1_3_old" NUMERIC(18,0),
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "unit1_2" NUMERIC(18,0),
    "unit1_3" NUMERIC(18,0),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Product_description]
CREATE TABLE IF NOT EXISTS "mdf_product_description" (
    "pd_id" NUMERIC(18,0) NOT NULL,
    "pd_code" VARCHAR(10),
    "pd_name_ar" VARCHAR(50),
    "pd_name_en" VARCHAR(50),
    "deleted" CHAR(1),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(9)
);

-- Source: [dbo].[Product_Dose]
CREATE TABLE IF NOT EXISTS "mdf_product_dose" (
    "dose_id" NUMERIC(18,0) NOT NULL,
    "dose_code" VARCHAR(10),
    "dose_name_ar" VARCHAR(150),
    "dose_name_en" VARCHAR(150),
    "deleted" CHAR(1),
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0)
);

-- Source: [dbo].[Product_groups]
CREATE TABLE IF NOT EXISTS "mdf_product_groups" (
    "group_id" NUMERIC(18,0) NOT NULL,
    "group_code" VARCHAR(20),
    "group_name_ar" VARCHAR(50),
    "group_name_en" VARCHAR(50),
    "deleted" CHAR(1),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(9)
);

-- Source: [dbo].[Product_online_Changes]
CREATE TABLE IF NOT EXISTS "mdf_product_online_changes" (
    "product_change_id" NUMERIC(18,0),
    "product_id" NUMERIC(18,0),
    "class" CHAR(1),
    "sell_price_old" NUMERIC(19,4),
    "buy_price_old" NUMERIC(19,4),
    "tax_price_old" NUMERIC(19,4),
    "unit1_2_old" NUMERIC(18,0),
    "unit1_3_old" NUMERIC(18,0),
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "unit1_2" NUMERIC(18,0),
    "unit1_3" NUMERIC(18,0),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Product_price_change]
CREATE TABLE IF NOT EXISTS "mdf_product_price_change" (
    "price_change_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "product_id" NUMERIC(18,0),
    "counter_id" NUMERIC(18,0),
    "old_buy_price" NUMERIC(19,4),
    "old_tax_price" NUMERIC(19,4),
    "new_buy_price" NUMERIC(19,4),
    "new_tax_price" NUMERIC(19,4),
    "product_amount" NUMERIC(18,0),
    "unit_id" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(20)
);

-- Source: [dbo].[Product_units]
CREATE TABLE IF NOT EXISTS "mdf_product_units" (
    "unit_id" NUMERIC(18,0) NOT NULL,
    "unit_code" VARCHAR(10),
    "unit_name_ar" VARCHAR(50),
    "unit_name_en" VARCHAR(50),
    "deleted" CHAR(1),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(9)
);

-- Source: [dbo].[Product_Vendor]
CREATE TABLE IF NOT EXISTS "mdf_product_vendor" (
    "pv_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "vendor_id" NUMERIC(18,0) NOT NULL,
    "pv_code" VARCHAR(20),
    "buy_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "sell_price" NUMERIC(19,4),
    "product_disc1" NUMERIC(18,0),
    "product_disc2" NUMERIC(18,0),
    "product_disc3" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(9)
);

-- Source: [dbo].[Products]
CREATE TABLE IF NOT EXISTS "mdf_products" (
    "product_id" NUMERIC(18,0) NOT NULL,
    "product_code" VARCHAR(20),
    "product_fast_code" VARCHAR(20),
    "product_int_code" VARCHAR(20),
    "product_name_ar" VARCHAR(100),
    "product_name_en" VARCHAR(100),
    "product_scientific_name" VARCHAR(200),
    "product_drug" CHAR(1),
    "company_id" NUMERIC(18,0),
    "product_has_expire" CHAR(1),
    "site_id" NUMERIC(18,0),
    "product_buy_number" NUMERIC(18,0),
    "product_big_number" NUMERIC(18,0),
    "product_small_number" NUMERIC(18,0),
    "sell_price" NUMERIC(19,4),
    "product_disc1" NUMERIC(10,0),
    "product_disc2" NUMERIC(18,0),
    "tax_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "deleted" CHAR(1),
    "active" CHAR(1),
    "product_unit1" NUMERIC(18,0),
    "product_unit2" NUMERIC(18,0),
    "product_unit3" NUMERIC(18,0),
    "product_unit1_2" NUMERIC(18,0),
    "product_unit1_3" NUMERIC(18,0),
    "group_id" NUMERIC(18,0),
    "pd_id" NUMERIC(18,0),
    "product_print_barcode" INTEGER NOT NULL,
    "product_allow_disc" INTEGER,
    "product_max_disc" DOUBLE PRECISION,
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0),
    "up_date" TIMESTAMP,
    "up_uid" NUMERIC(18,0),
    "notes" VARCHAR(300),
    "product_minus" CHAR(1),
    "product_made" CHAR(1),
    "product_int_code1" VARCHAR(50),
    "product_int_code2" VARCHAR(50),
    "product_int_code3" VARCHAR(50),
    "product_int_code4" VARCHAR(50),
    "product_sale_unit" NUMERIC(18,0),
    "product_unit1_sale" NUMERIC(18,0),
    "unit2_sell_price" NUMERIC(19,4),
    "unit3_sell_price" NUMERIC(19,4),
    "sell_clause" NUMERIC(19,4),
    "unit2_sell_price_clause" NUMERIC(19,4),
    "unit3_sell_price_clause" NUMERIC(19,4),
    "amount_zero" CHAR(1),
    "product_int_code5" VARCHAR(50),
    "product_int_code6" VARCHAR(50),
    "product_int_code7" VARCHAR(50),
    "product_int_code8" VARCHAR(50),
    "product_int_code9" VARCHAR(50),
    "product_int_code10" VARCHAR(50),
    "product_int_code11" VARCHAR(50),
    "product_int_code12" VARCHAR(50),
    "product_int_code13" VARCHAR(50),
    "product_int_code14" VARCHAR(50),
    "no_print_name" CHAR(1)
);

-- Source: [dbo].[Products_online]
CREATE TABLE IF NOT EXISTS "mdf_products_online" (
    "product_id" NUMERIC(18,0) NOT NULL,
    "product_code" VARCHAR(20),
    "product_fast_code" VARCHAR(20),
    "product_int_code" VARCHAR(20),
    "product_name_ar" VARCHAR(100),
    "product_name_en" VARCHAR(100),
    "product_scientific_name" VARCHAR(200),
    "product_drug" CHAR(1),
    "company_id" NUMERIC(18,0),
    "product_has_expire" CHAR(1),
    "site_id" NUMERIC(18,0),
    "product_buy_number" NUMERIC(18,0),
    "product_big_number" NUMERIC(18,0),
    "product_small_number" NUMERIC(18,0),
    "sell_price" NUMERIC(19,4),
    "product_disc1" NUMERIC(18,0),
    "product_disc2" NUMERIC(18,0),
    "tax_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "deleted" CHAR(1),
    "active" CHAR(1),
    "product_unit1" NUMERIC(18,0),
    "product_unit2" NUMERIC(18,0),
    "product_unit3" NUMERIC(18,0),
    "product_unit1_2" NUMERIC(18,0),
    "product_unit1_3" NUMERIC(18,0),
    "group_id" NUMERIC(18,0),
    "pd_id" NUMERIC(18,0),
    "product_print_barcode" INTEGER NOT NULL,
    "product_allow_disc" INTEGER,
    "product_max_disc" DOUBLE PRECISION,
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(9),
    "up_date" TIMESTAMP,
    "up_uid" VARCHAR(9),
    "notes" VARCHAR(300),
    "product_minus" CHAR(1),
    "product_made" CHAR(1),
    "product_int_code1" VARCHAR(50),
    "product_int_code2" VARCHAR(50),
    "product_int_code3" VARCHAR(50),
    "product_int_code4" VARCHAR(50),
    "product_sale_unit" NUMERIC(18,0),
    "product_unit1_sale" NUMERIC(18,0),
    "unit2_sell_price" NUMERIC(19,4),
    "unit3_sell_price" NUMERIC(19,4),
    "amount_zero" CHAR(1)
);

-- Source: [dbo].[Purchase_details]
CREATE TABLE IF NOT EXISTS "mdf_purchase_details" (
    "details_id" NUMERIC(18,0) NOT NULL,
    "purchase_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "exp_date" TIMESTAMP,
    "amount" DOUBLE PRECISION,
    "bouns" DOUBLE PRECISION,
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "gain_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "back" CHAR(1),
    "back_amount" DOUBLE PRECISION,
    "back_price" NUMERIC(19,4),
    "back_bouns" NUMERIC(18,0),
    "back_tax_price" NUMERIC(19,4),
    "back_details_1" NUMERIC(19,4),
    "back_details_2" NUMERIC(19,4),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "co_tax_price" NUMERIC(19,4)
);

-- Source: [dbo].[Purchase_header]
CREATE TABLE IF NOT EXISTS "mdf_purchase_header" (
    "purchase_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "vendor_id" NUMERIC(18,0),
    "order_id" NUMERIC(18,0),
    "class" VARCHAR(2),
    "product_number" INTEGER,
    "total_bill" NUMERIC(19,4),
    "bill_disc_per" DOUBLE PRECISION,
    "bill_disc_money" NUMERIC(19,4),
    "bill_other_expenses" NUMERIC(19,4),
    "cashier_id" VARCHAR(10),
    "bill_number" VARCHAR(50),
    "bill_date" TIMESTAMP,
    "back" CHAR(1),
    "total_back" NUMERIC(19,4),
    "total_after_back" NUMERIC(19,4),
    "notes" TEXT,
    "gf_id" NUMERIC(18,0),
    "back_number" VARCHAR(20),
    "insert_uid" VARCHAR(10),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(10),
    "update_date" TIMESTAMP,
    "sell_back" CHAR(1),
    "man_back_details" VARCHAR(50),
    "customer_id" NUMERIC(18,0),
    "bill_tax" NUMERIC(19,4)
);

-- Source: [dbo].[Run_Backup]
CREATE TABLE IF NOT EXISTS "mdf_run_backup" (
    "job_id" NUMERIC(18,0) NOT NULL,
    "job_name" VARCHAR(50),
    "job_bath" VARCHAR(100),
    "every_hour" INTEGER,
    "del_backup" INTEGER,
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(20)
);

-- Source: [dbo].[Sale_classes]
CREATE TABLE IF NOT EXISTS "mdf_sale_classes" (
    "sale_class_id" NUMERIC(18,0) NOT NULL,
    "sale_class_code" VARCHAR(20),
    "sale_class_name" VARCHAR(100),
    "insert_uid" VARCHAR(50),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Sales_delivery_del_details]
CREATE TABLE IF NOT EXISTS "mdf_sales_delivery_del_details" (
    "details_id" NUMERIC(18,0) NOT NULL,
    "sales_delivery_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "exp_date" TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "sale_unit" INTEGER,
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "disc_money" NUMERIC(19,4),
    "disc_per" NUMERIC(18,0),
    "total_sell" NUMERIC(19,4),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(20),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Sales_delivery_del_header]
CREATE TABLE IF NOT EXISTS "mdf_sales_delivery_del_header" (
    "sales_delivery_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "customer_id" NUMERIC(18,0),
    "class" INTEGER,
    "product_number" INTEGER,
    "total_bill" NUMERIC(19,4),
    "total_after_disc" NUMERIC(19,4),
    "total_bill_net" NUMERIC(19,4),
    "total_disc_per" NUMERIC(18,0),
    "total_disc_money" NUMERIC(19,4),
    "customer_disc_per" NUMERIC(18,0),
    "bill_cash" NUMERIC(19,4),
    "cashier_id" VARCHAR(20),
    "notes" VARCHAR(200),
    "bill_other_expenses" NUMERIC(19,4),
    "gf_id" NUMERIC(18,0),
    "contract_id" NUMERIC(18,0),
    "major_customer_part" NUMERIC(19,4),
    "bill_number" VARCHAR(50),
    "back" CHAR(1),
    "bill_date" TIMESTAMP,
    "compu_name" VARCHAR(150),
    "cashier_disk_id" NUMERIC(18,0),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(20),
    "update_date" TIMESTAMP,
    "sale_class" INTEGER,
    "ticket_name" CHAR(100),
    "ticket_id" CHAR(50),
    "ticket_num" CHAR(50)
);

-- Source: [dbo].[Sales_delivery_details]
CREATE TABLE IF NOT EXISTS "mdf_sales_delivery_details" (
    "details_id" NUMERIC(18,0) NOT NULL,
    "sales_delivery_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "exp_date" TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "sale_unit" INTEGER,
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "disc_money" NUMERIC(19,4),
    "disc_per" NUMERIC(18,0),
    "total_sell" NUMERIC(19,4),
    "back" CHAR(1),
    "back_amount" DOUBLE PRECISION,
    "back_price" NUMERIC(19,4),
    "back_unit" INTEGER,
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(20),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Sales_delivery_header]
CREATE TABLE IF NOT EXISTS "mdf_sales_delivery_header" (
    "sales_delivery_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "customer_id" NUMERIC(18,0),
    "class" INTEGER,
    "product_number" INTEGER,
    "total_bill" NUMERIC(19,4),
    "total_after_disc" NUMERIC(19,4),
    "total_bill_net" NUMERIC(19,4),
    "total_disc_per" NUMERIC(18,0),
    "total_disc_money" NUMERIC(19,4),
    "customer_disc_per" NUMERIC(18,0),
    "bill_cash" NUMERIC(19,4),
    "cashier_id" VARCHAR(20),
    "notes" VARCHAR(200),
    "bill_other_expenses" NUMERIC(19,4),
    "gf_id" NUMERIC(18,0),
    "contract_id" NUMERIC(18,0),
    "major_customer_part" NUMERIC(19,4),
    "bill_number" VARCHAR(50),
    "back" CHAR(1),
    "bill_date" TIMESTAMP,
    "compu_name" VARCHAR(150),
    "cashier_disk_id" NUMERIC(18,0),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(20),
    "update_date" TIMESTAMP,
    "sale_class" INTEGER,
    "ticket_name" CHAR(100),
    "ticket_id" CHAR(50),
    "ticket_num" CHAR(50)
);

-- Source: [dbo].[Sales_details]
CREATE TABLE IF NOT EXISTS "mdf_sales_details" (
    "sales_id" NUMERIC(18,0) NOT NULL,
    "details_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "exp_date" TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "sale_unit_change" NUMERIC(18,0),
    "sale_unit" INTEGER,
    "sell_price" NUMERIC(19,4) NOT NULL,
    "buy_price" NUMERIC(19,4),
    "disc_money" NUMERIC(19,4),
    "disc_per" NUMERIC(18,3),
    "total_sell" NUMERIC(19,4),
    "back" CHAR(1),
    "back_amount" DOUBLE PRECISION,
    "back_unit_change" NUMERIC(18,0),
    "back_price" NUMERIC(19,4),
    "back_unit" INTEGER,
    "back_gf_id" NUMERIC(18,0),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(20),
    "update_date" TIMESTAMP,
    "sales_details_id" NUMERIC(18,0) NOT NULL
);

-- Source: [dbo].[Sales_details_Temp]
CREATE TABLE IF NOT EXISTS "mdf_sales_details_temp" (
    "details_id" NUMERIC(18,0) NOT NULL,
    "sales_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "exp_date" TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "sale_unit_change" NUMERIC(18,0),
    "sale_unit" INTEGER,
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "disc_money" NUMERIC(19,4),
    "disc_per" NUMERIC(18,0),
    "total_sell" NUMERIC(19,4),
    "back" CHAR(1),
    "back_amount" DOUBLE PRECISION,
    "back_unit_change" NUMERIC(18,0),
    "back_price" NUMERIC(19,4),
    "back_unit" INTEGER,
    "back_gf_id" NUMERIC(18,0),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(20),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Sales_header]
CREATE TABLE IF NOT EXISTS "mdf_sales_header" (
    "sales_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "customer_id" NUMERIC(18,0),
    "class" INTEGER,
    "product_number" INTEGER,
    "bill_money_befor" NUMERIC(19,4),
    "total_bill" NUMERIC(19,4),
    "total_after_disc" NUMERIC(19,4),
    "total_bill_net" NUMERIC(19,4),
    "total_disc_per" NUMERIC(18,0),
    "total_disc_money" NUMERIC(19,4),
    "total_product_disc" NUMERIC(19,4),
    "customer_disc_per" NUMERIC(18,0),
    "bill_cash" NUMERIC(19,4),
    "cashier_id" NUMERIC(18,0),
    "notes" VARCHAR(200),
    "bill_other_expenses" NUMERIC(19,4),
    "gf_id" NUMERIC(18,0),
    "contract_id" NUMERIC(18,0),
    "major_customer_part" NUMERIC(19,4),
    "bill_number" VARCHAR(50),
    "back" CHAR(1),
    "bill_date" TIMESTAMP,
    "compu_name" VARCHAR(150),
    "cashier_disk_id" NUMERIC(18,0),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "cust_name" VARCHAR(75),
    "sale_class" INTEGER,
    "network_id" NUMERIC(18,0),
    "network_money" NUMERIC(19,4),
    "money_change" NUMERIC(19,4),
    "delivery_man_id" NUMERIC(8,0),
    "ticket_name" VARCHAR(100),
    "ticket_id" VARCHAR(50),
    "ticket_num" VARCHAR(50)
);

-- Source: [dbo].[Sales_header_Temp]
CREATE TABLE IF NOT EXISTS "mdf_sales_header_temp" (
    "sales_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "customer_id" NUMERIC(18,0),
    "class" INTEGER,
    "product_number" INTEGER,
    "bill_money_befor" NUMERIC(19,4),
    "total_bill" NUMERIC(19,4),
    "total_after_disc" NUMERIC(19,4),
    "total_bill_net" NUMERIC(19,4),
    "total_disc_per" NUMERIC(18,0),
    "total_disc_money" NUMERIC(19,4),
    "total_product_disc" NUMERIC(19,4),
    "customer_disc_per" NUMERIC(18,0),
    "bill_cash" NUMERIC(19,4),
    "cashier_id" VARCHAR(50),
    "notes" VARCHAR(200),
    "bill_other_expenses" NUMERIC(19,4),
    "gf_id" NUMERIC(18,0),
    "contract_id" NUMERIC(18,0),
    "major_customer_part" NUMERIC(19,4),
    "bill_number" VARCHAR(50),
    "back" CHAR(1),
    "bill_date" TIMESTAMP,
    "compu_name" VARCHAR(150),
    "cashier_disk_id" NUMERIC(18,0),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(20),
    "update_date" TIMESTAMP,
    "cust_name" VARCHAR(75),
    "ticket_name" CHAR(100),
    "ticket_id" CHAR(50),
    "ticket_num" CHAR(50)
);

-- Source: [dbo].[Shortcoming]
CREATE TABLE IF NOT EXISTS "mdf_shortcoming" (
    "id" NUMERIC(18,0) NOT NULL,
    "class" CHAR(1),
    "product_id" NUMERIC(18,0),
    "general" CHAR(1),
    "notes" VARCHAR(50),
    "store_id" NUMERIC(18,0),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(20),
    "update_date" TIMESTAMP,
    "vendor_id" NUMERIC(18,0),
    "amount" DOUBLE PRECISION
);

-- Source: [dbo].[Sites]
CREATE TABLE IF NOT EXISTS "mdf_sites" (
    "site_id" NUMERIC(18,0) NOT NULL,
    "site_code" VARCHAR(20),
    "site_name" VARCHAR(50),
    "site_full_name" VARCHAR(150),
    "site_major" NUMERIC(18,0),
    "deleted" CHAR(1),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(9)
);

-- Source: [dbo].[Start_stock_details]
CREATE TABLE IF NOT EXISTS "mdf_start_stock_details" (
    "details_id" NUMERIC(18,0) NOT NULL,
    "sstock_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0) NOT NULL,
    "counter_id" NUMERIC(18,0) NOT NULL,
    "exp_date" TIMESTAMP,
    "amount" DOUBLE PRECISION,
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "gain_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "unit_id" NUMERIC(18,0),
    "unit_change" NUMERIC(18,0)
);

-- Source: [dbo].[Start_stock_header]
CREATE TABLE IF NOT EXISTS "mdf_start_stock_header" (
    "sstock_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "product_number" INTEGER,
    "total_bill" NUMERIC(19,4),
    "cashier_id" NUMERIC(18,0),
    "notes" TEXT,
    "insert_uid" NUMERIC(18,0),
    "insert_date" TIMESTAMP,
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[Store_convert_details]
CREATE TABLE IF NOT EXISTS "mdf_store_convert_details" (
    "details_id" NUMERIC(18,0) NOT NULL,
    "store_convert_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0),
    "counter_id" NUMERIC(18,0),
    "amount" DOUBLE PRECISION,
    "exp_date" TIMESTAMP,
    "unit_id" NUMERIC(18,0),
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "insert_uid" VARCHAR(50),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Store_convert_header]
CREATE TABLE IF NOT EXISTS "mdf_store_convert_header" (
    "store_convert_id" NUMERIC(18,0) NOT NULL,
    "from_store_id" NUMERIC(18,0),
    "to_store_id" NUMERIC(18,0),
    "total_sell_price" NUMERIC(19,4),
    "total_buy_price" NUMERIC(19,4),
    "product_number" INTEGER,
    "notes" VARCHAR(100),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Stores]
CREATE TABLE IF NOT EXISTS "mdf_stores" (
    "store_id" NUMERIC(18,0) NOT NULL,
    "store_code" VARCHAR(20),
    "store_name_ar" VARCHAR(50),
    "store_name_en" VARCHAR(50),
    "active" CHAR(1),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(9),
    "start_update_date" TIMESTAMP
);

-- Source: [dbo].[Temp_Purchase_details]
CREATE TABLE IF NOT EXISTS "mdf_temp_purchase_details" (
    "details_id" NUMERIC(18,0) NOT NULL,
    "temp_purchase_id" NUMERIC(18,0) NOT NULL,
    "product_id" NUMERIC(18,0),
    "exp_date" TIMESTAMP,
    "amount" DOUBLE PRECISION,
    "bouns" DOUBLE PRECISION,
    "sell_price" NUMERIC(19,4),
    "buy_price" NUMERIC(19,4),
    "gain_price" NUMERIC(19,4),
    "tax_price" NUMERIC(19,4),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Temp_Purchase_header]
CREATE TABLE IF NOT EXISTS "mdf_temp_purchase_header" (
    "temp_purchase_id" NUMERIC(18,0) NOT NULL,
    "store_id" NUMERIC(18,0),
    "vendor_id" NUMERIC(18,0),
    "class" VARCHAR(2),
    "product_number" INTEGER,
    "total_bill" NUMERIC(19,4),
    "bill_disc_per" DOUBLE PRECISION,
    "bill_disc_money" NUMERIC(19,4),
    "bill_other_expenses" NUMERIC(19,4),
    "bill_number" VARCHAR(50),
    "bill_date" TIMESTAMP,
    "notes" VARCHAR(100),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "bill_tax" NUMERIC(19,4)
);

-- Source: [dbo].[Tuning_accounts]
CREATE TABLE IF NOT EXISTS "mdf_tuning_accounts" (
    "tuning_accounts_id" NUMERIC(18,0) NOT NULL,
    "class" CHAR(1),
    "who_class" INTEGER,
    "who_id" NUMERIC(18,0),
    "tuning_accounts_reason_id" NUMERIC(18,0),
    "tuning_accounts_money" NUMERIC(19,4),
    "notes" VARCHAR(50),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP
);

-- Source: [dbo].[Tuning_accounts_reason]
CREATE TABLE IF NOT EXISTS "mdf_tuning_accounts_reason" (
    "tuning_accounts_reason_id" NUMERIC(18,0) NOT NULL,
    "tuning_accounts_reason_name_ar" VARCHAR(50),
    "tuning_accounts_reason_name_en" VARCHAR(50),
    "deleted" CHAR(1),
    "insert_uid" VARCHAR(20),
    "insert_date" TIMESTAMP,
    "update_uid" VARCHAR(20),
    "update_date" TIMESTAMP
);

-- Source: [dbo].[user_login]
CREATE TABLE IF NOT EXISTS "mdf_user_login" (
    "lu_id" NUMERIC(18,0) NOT NULL,
    "u_id" NUMERIC(18,0),
    "start_time" TIMESTAMP,
    "end_time" TIMESTAMP,
    "compu_name" VARCHAR(50)
);

-- Source: [dbo].[Vendor]
CREATE TABLE IF NOT EXISTS "mdf_vendor" (
    "vendor_id" NUMERIC(18,0) NOT NULL,
    "vendor_code" VARCHAR(20),
    "vendor_name_ar" VARCHAR(50),
    "vendor_name_en" VARCHAR(50),
    "tel" VARCHAR(20),
    "mobile" VARCHAR(20),
    "address" VARCHAR(100),
    "company_code" VARCHAR(20),
    "vendor_max_money" NUMERIC(19,4),
    "vendor_current_money" NUMERIC(19,4),
    "deleted" CHAR(1),
    "active" CHAR(1),
    "vendor_start_money" NUMERIC(19,4),
    "insert_date" TIMESTAMP,
    "insert_uid" NUMERIC(18,0),
    "update_uid" NUMERIC(18,0),
    "update_date" TIMESTAMP,
    "emp_tel" VARCHAR(100),
    "emp_tel_details" VARCHAR(100),
    "emp_area_manegar" VARCHAR(100),
    "emp_area_manegar_details" VARCHAR(100),
    "emp_deliv" VARCHAR(100),
    "emp_deliv_details" VARCHAR(100),
    "emp_get_money" VARCHAR(100),
    "emp_get_money_details" VARCHAR(100),
    "ven_notes" VARCHAR(100),
    "ven_return" VARCHAR(100)
);

-- Source: [dbo].[versions]
CREATE TABLE IF NOT EXISTS "mdf_versions" (
    "ver_id" NUMERIC(18,0) NOT NULL,
    "ver_code" VARCHAR(50),
    "insert_date" TIMESTAMP,
    "insert_uid" VARCHAR(20)
);


