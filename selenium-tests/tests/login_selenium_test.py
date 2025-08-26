from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()

try:
    driver.get("http://localhost:5173/login")
    driver.maximize_window() 

    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Username']").send_keys("vlad")
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Password']").send_keys("1234")

    driver.find_element(By.CSS_SELECTOR, "button.action-button").click()

    time.sleep(2)

    user_valid = driver.execute_script("return localStorage.getItem('userValid');")

    if user_valid == "yes":
        print("Test passed: User logged in successfully!")
    else:
        print("Test failed: Login unsuccessful.")
finally:
    driver.quit()
