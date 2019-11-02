### service worker


坑：  fetch 是有 scope 限制的，若将service-worker.js放在某个文件夹（假设文件夹名是sw）下，若要正确获取service-worker.js,scope需设为该文件夹（sw）,此时再获取其他文件（如html、css），由于这些文件不在设置的scope（sw文件夹）下，因此可能会导致service-worker.js中fetch事件无法触发。