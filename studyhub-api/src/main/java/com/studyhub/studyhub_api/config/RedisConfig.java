package com.studyhub.studyhub_api.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

/**
 * RedisConfig
 * <p>
 * Purpose: Configures Redis caching for the authentication service.
 * Sets the default cache serialization strategy and time-to-live (TTL) for cached entries.
 * <p>
 * Features:
 * - Enables Spring Cache abstraction with Redis as the caching provider.
 * - Configures value serialization using JSON format.
 * - Sets a default expiration time of 10 minutes for all cache entries
 */
@Configuration
@EnableCaching
public class RedisConfig {

    /**
     * Configures the Redis cache settings.
     *
     * @return {RedisCacheConfiguration} a RedisCacheConfiguration instance with:
     * - GenericJackson2JsonRedisSerializer for serializing/deserializing cache values as JSON
     * - A default time-to-live (TTL) of 10 minutes for all cached entries
     */
    @Bean
    public RedisCacheConfiguration redisCacheConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
                .serializeValuesWith(
                        RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer())
                )
                .entryTtl(Duration.ofMinutes(10));
    }

    /**
     * THÊM BEAN NÀY: Cấu hình RedisTemplate để bạn tự gọi code thủ công trong Service
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        // Sử dụng StringRedisSerializer để serialize cho phần Key (để key hiển thị dạng text tường minh trong Redis)
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());

        // Sử dụng GenericJackson2JsonRedisSerializer để tự động parse Object Java thành chuỗi JSON khi lưu vào Value
        GenericJackson2JsonRedisSerializer jsonSerializer = new GenericJackson2JsonRedisSerializer();
        template.setValueSerializer(jsonSerializer);
        template.setHashValueSerializer(jsonSerializer);

        template.afterPropertiesSet();
        return template;
    }
}
