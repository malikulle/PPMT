package com.project.ppmtool.security;

import com.project.ppmtool.domain.User;
import com.project.ppmtool.services.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import static com.project.ppmtool.security.SecurityConstants.HEADER_STRING;
import static com.project.ppmtool.security.SecurityConstants.TOKEN_PREFIX;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(httpServletRequest);
            if(StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)){
                Long userId = tokenProvider.getUserIdFromJWT(jwt);
                User userDetails = customUserDetailService.loadUserById(userId);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,null, Collections.emptyList());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }catch (Exception ex){
            logger.error("Could not set user authentication in security context" ,ex);
        }
        filterChain.doFilter(httpServletRequest,httpServletResponse);
    }
    public String getJwtFromRequest(HttpServletRequest request){
        String BearerToken = request.getHeader(HEADER_STRING);

        if(StringUtils.hasText(BearerToken) && BearerToken.startsWith(TOKEN_PREFIX))
            return BearerToken.substring(7,BearerToken.length());
        return null;
    }
}
