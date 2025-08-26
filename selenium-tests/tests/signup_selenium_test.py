from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
try:
    driver.get("http://localhost:5173/signup")
    driver.maximize_window()
    
    username = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Username']")    
    password = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Password']") 

    username.send_keys("costel")
    password.send_keys("1234")
    time.sleep(2)

    driver.find_element(By.CSS_SELECTOR, "button.action-button").click()
    time.sleep(2)

    user_valid = driver.execute_script("return localStorage.getItem('userValid');")
    
    if user_valid == "yes":
        print("Test passed")
    else:
        print("Test failed, userValid =", user_valid)  
        
finally:
    driver.quit()
