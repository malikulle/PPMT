package com.project.ppmtool.security;

import com.project.ppmtool.domain.User;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.project.ppmtool.security.SecurityConstants.EXPIRATION_TIME;
import static com.project.ppmtool.security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {

    public String generateToken(Authentication authentication){
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());

        Date expireDate = new Date(now.getTime() + EXPIRATION_TIME);

        String userId = Long.toString(user.getId());

        Map<String,Object> claims = new HashMap<>();
        claims.put("id",Long.toString(user.getId()));
        claims.put("username" , user.getUsername());
        claims.put("fullName",user.getFullName());
        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(System.currentTimeMillis() + 3600000*2))
                .signWith(SignatureAlgorithm.HS512 , SECRET)
                .compact();
    }

    public  boolean validateToken (String token){
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        }
        catch (SignatureException ex){
            System.out.println("Invalid Jwt Signutere.");
            return false;
        }catch (MalformedJwtException ex){
            System.out.println("Invalid Token.");
            return false;
        }catch (ExpiredJwtException ec){
            System.out.println("Expired Token.");
            return false;
        }catch (UnsupportedJwtException ex){
            System.out.println("Unsupported JWT token");
            return false;
        }catch (IllegalArgumentException ex){
            System.out.println("JWT claims string is empty");
            return false;
        }
    }

    public Long getUserIdFromJWT(String token){
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String) claims.get("id");
        return Long.parseLong(id);
    }
}
