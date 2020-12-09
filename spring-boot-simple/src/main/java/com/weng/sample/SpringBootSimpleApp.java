package com.weng.sample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 启动类
 *
 **/
@SpringBootApplication(scanBasePackages ={
        "com.weng.framework",
        "com.weng.sample"
})


public class SpringBootSimpleApp implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootSimpleApp.class, args);
	}
}
