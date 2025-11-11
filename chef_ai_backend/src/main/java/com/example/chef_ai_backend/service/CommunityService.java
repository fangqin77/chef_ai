package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.CommunityMapper;
import com.example.chef_ai_backend.model.Post;
import com.example.chef_ai_backend.model.Comment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommunityService {
    private final CommunityMapper communityMapper;

    public CommunityService(CommunityMapper communityMapper) {
        this.communityMapper = communityMapper;
    }

    // 分页工具：返回 {list, total, page, pageSize}
    private Map<String, Object> toPageResult(List<?> list, int total, int page, int pageSize) {
        Map<String, Object> r = new HashMap<>();
        r.put("list", list);
        r.put("total", total);
        r.put("page", page);
        r.put("pageSize", pageSize);
        return r;
    }

    public Map<String, Object> listPosts(String keyword, Long userId, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        List<java.util.Map<String,Object>> list = communityMapper.listApprovedPostsView(keyword, userId, offset, pageSize);
        int total = communityMapper.countApprovedPosts(keyword, userId);
        return toPageResult(list, total, page, pageSize);
    }

    public Map<String, Object> listMyPosts(Long ownerId, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        List<Post> list = communityMapper.listMyPosts(ownerId, offset, pageSize);
        int total = communityMapper.countMyPosts(ownerId);
        return toPageResult(list, total, page, pageSize);
    }

    public Post getPostForViewer(Long postId, Long viewerId) {
        return communityMapper.getPostForViewer(postId, viewerId);
    }

    @Transactional
    public Long createPost(Long userId, String content, String mediaJson, Integer visibility) {
        System.out.println("准备插入帖子: userId=" + userId + ", content=" + content + ", mediaJson=" + mediaJson + ", visibility=" + visibility);
        Post p = new Post();
        p.setUserId(userId);
        p.setContent(content);
        p.setMediaJson(mediaJson);
        p.setVisibility(visibility == null ? 1 : visibility);
        // status=normal, audit_status=pending 在XML里默认写入
        communityMapper.insertPost(p);
        System.out.println("帖子插入完成，ID=" + p.getId());
        return p.getId();
    }

    public boolean deleteMyPost(Long userId, Long postId) {
        return communityMapper.softDeletePost(postId, userId) > 0;
    }

    public Map<String, Object> listComments(Long postId, Long parentId, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        List<Comment> list = communityMapper.listApprovedComments(postId, parentId, offset, pageSize);
        int total = communityMapper.countApprovedComments(postId, parentId);
        return toPageResult(list, total, page, pageSize);
    }

    @Transactional
    public Long createComment(Long userId, Long postId, Long parentId, String content) {
        Comment c = new Comment();
        c.setPostId(postId);
        c.setUserId(userId);
        c.setParentId(parentId);
        c.setContent(content);
        communityMapper.insertComment(c);
        // 计数+1
        communityMapper.incrPostCommentCount(postId, 1);
        return c.getId();
    }

    @Transactional
    public boolean deleteMyComment(Long userId, Long commentId, Long postId) {
        int ok = communityMapper.softDeleteComment(commentId, userId);
        if (ok > 0) {
            communityMapper.incrPostCommentCount(postId, -1);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean likePost(Long userId, Long postId) {
        int ins = communityMapper.insertPostLike(postId, userId);
        if (ins > 0) {
            communityMapper.incrPostLikeCount(postId, 1);
        }
        return true; // 幂等，已点赞返回 true
    }

    @Transactional
    public boolean cancelLikePost(Long userId, Long postId) {
        int del = communityMapper.deletePostLike(postId, userId);
        if (del > 0) {
            communityMapper.incrPostLikeCount(postId, -1);
        }
        return true;
    }

    public boolean favoritePost(Long userId, Long postId) {
        communityMapper.insertFavorite(postId, userId);
        return true;
    }

    public boolean cancelFavoritePost(Long userId, Long postId) {
        communityMapper.deleteFavorite(postId, userId);
        return true;
    }

    public Long report(String targetType, Long targetId, Long reporterId, String reasonCode, String text) {
        communityMapper.insertReport(targetType, targetId, reporterId, reasonCode, text);
        return 1L;
    }

    // 编辑帖子（仅作者）
    @Transactional
    public boolean updatePost(Long ownerId, Long postId, String content, String mediaJson, Integer visibility) {
        int ok = communityMapper.updatePost(postId, ownerId, content, mediaJson, visibility);
        return ok > 0;
    }

    // 收藏的帖子列表（已审核+正常）
    public Map<String, Object> listFavoritePosts(Long userId, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        List<Post> list = communityMapper.listFavoritePosts(userId, offset, pageSize);
        int total = communityMapper.countFavoritePosts(userId);
        return toPageResult(list, total, page, pageSize);
    }

    // 我发表的评论列表（正常）
    public Map<String, Object> listMyComments(Long userId, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        List<Comment> list = communityMapper.listMyComments(userId, offset, pageSize);
        int total = communityMapper.countMyComments(userId);
        return toPageResult(list, total, page, pageSize);
    }
}